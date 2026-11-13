# MR’s Products

Site estático em português, com HTML, CSS e JavaScript separados. Sem instalação ou build.

## Rodar
Na pasta do projeto: `node server.mjs`. Abra http://localhost:8000. Também funciona com a extensão Live Server do VS Code.

## Configurar antes de publicar
- `js/main.js`: altere CONTACT.whatsapp (somente números, incluindo 55 e DDD), CONTACT.email e CONTACT.instagram. O formulário prepara a mensagem no WhatsApp; não armazena dados e não simula envio.
- Substitua os monogramas dos sócios por fotos autorizadas, se desejar.
- A placa atual é uma reprodução ilustrativa em SVG/CSS e Three.js. A foto fornecida na conversa não está no diretório de anexos. Para máxima fidelidade, adicione o recorte autorizado em PNG/WebP transparente em assets/ e use-o no fallback.
- Configure domínio em sitemap.xml e robots.txt. Complete og:url e og:image após definir domínio e imagem de compartilhamento.
- Confirme frete, prazos, pagamentos e condições da garantia antes da publicação.

## Movimento e recursos
Three.js é carregado somente no desktop sem preferência por movimento reduzido ou economia de dados. Falhas no WebGL/CDN preservam a placa CSS. GSAP, ScrollTrigger e Lenis são melhorias opcionais via CDN; interações não dependem deles. Fontes Google possuem fallback de sistema. Não há rastreamento ou backend.

Abas usam setas, Home e End. FAQ usa details/summary nativo. Formulário usa validação HTML e feedback acessível. Movimento pode ser pausado no hero, respeita prefers-reduced-motion e fica pausado fora da tela. O demo é ilustrativo, sem pagamentos ou perfis reais.

## Melhorias futuras
1. Integrar fotografias profissionais da placa e fotos dos sócios.
2. Conectar formulário a um serviço de atendimento, com consentimento e política de privacidade apropriados.
3. Incluir portfólio real e medir performance no domínio final para otimizar conversão e carregamento.

## Limites de validação
Meta Lighthouse 90+ depende de medição no ambiente final; não é uma pontuação garantida. Giroscópio e bloom não foram habilitados: o modelo usa luz azul e aura CSS, com tilt por mouse. Os símbolos visuais são recriados, não um arquivo oficial da marca. Hospedagem não foi configurada, pois a entrega solicitada é o código local pronto para rodar.

