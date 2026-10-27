# Imagem do site Rebrote — nginx servindo arquivos estáticos
#
# ATENÇÃO (pitfall conhecido deste homelab): no Nomad, porta estática publica o
# MESMO número dentro e fora do container. Por isso o nginx precisa escutar em 8099
# (e não em 80), senão o container fica "healthy" e nada responde na porta publicada.

FROM nginx:alpine

# Faz o nginx escutar na porta que o Nomad publica
RUN sed -i 's/listen[[:space:]]*80;/listen 8099;/' /etc/nginx/conf.d/default.conf \
 && sed -i 's/listen[[:space:]]*\[::\]:80;/listen [::]:8099;/' /etc/nginx/conf.d/default.conf

# Site
COPY index.html /usr/share/nginx/html/index.html
COPY assets     /usr/share/nginx/html/assets

# Documentação do trabalho também acessível pelo navegador
COPY README.md        /usr/share/nginx/html/README.md
COPY APRESENTACAO.md  /usr/share/nginx/html/APRESENTACAO.md

# Sem listagem de diretório
RUN sed -i 's/autoindex on/autoindex off/' /etc/nginx/nginx.conf || true

EXPOSE 8099

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8099/ >/dev/null 2>&1 || exit 1
