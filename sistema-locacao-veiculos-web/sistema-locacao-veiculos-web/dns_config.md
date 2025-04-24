# Configuração de Domínio e DNS para o Sistema de Locação de Veículos

## Domínios Configurados

### Frontend
- **URL Principal**: https://sistema-locacao-veiculos.netlify.app
- **Provedor de Hospedagem**: Netlify
- **Tipo de Implantação**: Site Estático

### Backend
- **URL da API**: https://sistema-locacao-veiculos-api.onrender.com/api
- **Provedor de Hospedagem**: Render
- **Tipo de Implantação**: Web Service

## Configuração de DNS no Netlify

Para configurar um domínio personalizado no Netlify:

1. Acesse o painel de controle do Netlify
2. Navegue até o site `sistema-locacao-veiculos`
3. Vá para a seção "Domain settings"
4. Clique em "Add custom domain"
5. Digite o domínio desejado (ex: locaveiculos.com)
6. Siga as instruções para verificar a propriedade do domínio

### Registros DNS Necessários

Para um domínio personalizado, configure os seguintes registros DNS no seu provedor de domínio:

| Tipo  | Nome                | Valor                                  | TTL    |
|-------|---------------------|----------------------------------------|--------|
| A     | @                   | 75.2.60.5                              | 3600   |
| CNAME | www                 | sistema-locacao-veiculos.netlify.app   | 3600   |
| CNAME | api                 | sistema-locacao-veiculos-api.onrender.com | 3600 |

## Configuração de DNS no Render

Para configurar um domínio personalizado para a API no Render:

1. Acesse o painel de controle do Render
2. Navegue até o serviço `sistema-locacao-veiculos-api`
3. Vá para a seção "Settings" > "Custom Domain"
4. Adicione o domínio personalizado (ex: api.locaveiculos.com)
5. Siga as instruções para verificar a propriedade do domínio

## Configuração de HTTPS

Tanto o Netlify quanto o Render fornecem certificados SSL/TLS automaticamente para seus domínios e para domínios personalizados. Não é necessária nenhuma configuração adicional para habilitar HTTPS.

## Atualização de Configurações do Frontend

Após configurar um domínio personalizado, atualize o arquivo `config.js` do frontend para apontar para o novo domínio da API:

```javascript
// URL base da API em produção com domínio personalizado
const API_URL = 'https://api.locaveiculos.com/api';
```

## Atualização de Configurações do Backend

Após configurar um domínio personalizado, atualize a configuração CORS no backend:

```properties
# Configurações de CORS com domínio personalizado
cors.allowed-origins=${CORS_ALLOWED_ORIGINS:https://locaveiculos.com,https://www.locaveiculos.com}
```

## Verificação de Configuração

Após configurar os domínios personalizados, verifique:

1. Se o site está acessível pelo novo domínio
2. Se a API está acessível pelo novo domínio
3. Se o frontend consegue se comunicar corretamente com a API
4. Se os certificados SSL/TLS estão funcionando corretamente (conexão segura)

## Monitoramento de DNS

Utilize ferramentas como [DNSChecker](https://dnschecker.org) ou [MXToolbox](https://mxtoolbox.com) para verificar a propagação dos registros DNS, que pode levar até 48 horas para ser concluída em todo o mundo.
