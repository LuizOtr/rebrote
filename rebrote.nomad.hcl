# Job Nomad — site da Rebrote (landing page da Atividade 10)
#
# Cluster: servidor Nomad na frontier (10.10.10.103:4646).
# A imagem é construída NO PRÓPRIO NÓ (não há registry privado):
#   docker build -t rebrote-site:1.0.0 .
#
# Depois de reconstruir a imagem com a MESMA tag, o `nomad job run` é no-op:
# é preciso `nomad job stop -purge rebrote-site` + `nomad job run`.

job "rebrote-site" {
  datacenters = ["dc1"]
  type        = "service"

  # Pool "firecrawl" = nó forge (10.10.10.101).
  # Motivo: no frontier os três servidores de jogo reservam ~21 GiB dos ~23 GiB da VM,
  # então o agendador recusa até 64 MB ("Resources exhausted / Dimension memory exhausted").
  # A imagem precisa existir NO NÓ QUE RODA o job — construir também no forge.
  node_pool   = "firecrawl"

  group "web" {
    count = 1

    network {
      port "http" {
        # Porta estática = MESMO número dentro e fora do container.
        # O nginx da imagem escuta 8099 (ver Dockerfile).
        static = 8099
      }
    }

    task "nginx" {
      driver = "docker"

      config {
        image      = "rebrote-site:1.0.0"
        force_pull = false # imagem local, não existe no Docker Hub
        ports      = ["http"]
      }

      resources {
        cpu    = 100
        memory = 64
      }

      service {
        name     = "rebrote-site"
        port     = "http"
        provider = "nomad" # sem Consul neste cluster

        check {
          type     = "http"
          path     = "/"
          interval = "15s"
          timeout  = "3s"
        }
      }

      # attempts = 0 é rejeitado pelo Nomad 2.0.5 ("Restart policy delay with 0 attempts is ambiguous")
      restart {
        attempts = 5
        delay    = "15s"
        interval = "30m"
        mode     = "delay"
      }
    }
  }
}
