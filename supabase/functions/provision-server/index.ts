// supabase/functions/provision-server/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProvisionRequest {
  serverName: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Créer le client Supabase avec le token de l'utilisateur
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Récupérer l'utilisateur connecté
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    // Parser la requête
    const { serverName }: ProvisionRequest = await req.json()

    console.log(`🔧 Provisioning server for user: ${user.id}`)

    // Vérifier que l'utilisateur n'a pas déjà un serveur
    const { data: existingServer, error: checkError } = await supabaseClient
      .from('servers')
      .select('id')
      .eq('user_id', user.id)
      .neq('status', 'deleted')
      .single()

    if (existingServer) {
      throw new Error('You already have a server. Delete it first to create a new one.')
    }

    // Générer un hostname unique
    const randomId = crypto.randomUUID().split('-')[0]
    const hostname = `almerson-${randomId}`

    // Trouver le prochain VMID disponible
    const { data: lastServer } = await supabaseClient
      .from('servers')
      .select('proxmox_vmid')
      .order('proxmox_vmid', { ascending: false })
      .limit(1)
      .single()

    const vmid = lastServer ? lastServer.proxmox_vmid + 1 : 100

    console.log(`📦 Creating server with VMID: ${vmid}`)

    // Créer l'entrée serveur en DB
    const { data: server, error: insertError } = await supabaseClient
      .from('servers')
      .insert({
        user_id: user.id,
        name: serverName,
        hostname,
        status: 'provisioning',
        proxmox_vmid: vmid,
        proxmox_node: 'pve',
      })
      .select()
      .single()

    if (insertError) throw insertError

    console.log(`✅ Server entry created: ${server.id}`)

    // Logger l'action
    await supabaseClient
      .from('server_actions')
      .insert({
        server_id: server.id,
        user_id: user.id,
        action: 'create',
        status: 'pending',
      })

    // TODO: Appeler le worker Proxmox pour provisionner réellement
    // Pour l'instant, on simule un provisioning instantané
    console.log(`🚀 [SIMULATION] Would provision server with VMID ${vmid}`)

    // Simuler le provisioning (pour le POC)
    setTimeout(async () => {
      const fakeIP = `198.51.100.${vmid - 99}`
      
      await supabaseClient
        .from('servers')
        .update({
          status: 'active',
          ipv4: fakeIP,
          provisioned_at: new Date().toISOString(),
        })
        .eq('id', server.id)

      await supabaseClient
        .from('server_actions')
        .update({
          status: 'success',
          completed_at: new Date().toISOString(),
        })
        .eq('server_id', server.id)
        .eq('action', 'create')

      console.log(`✅ Server ${server.id} provisioned with IP ${fakeIP}`)
    }, 3000)

    return new Response(
      JSON.stringify({
        success: true,
        serverId: server.id,
        message: 'Server provisioning started',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('❌ Provision error:', error)

    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
