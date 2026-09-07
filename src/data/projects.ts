import conceptual from "@/assets/conceptual.webp";
import detail from "@/assets/detail.webp";
import project1 from "@/assets/project-1.webp";
import project2 from "@/assets/project-2.webp";
import project3 from "@/assets/project-3.webp";
import studio from "@/assets/studio.webp";
import frontCasaPatio from "@/assets/front-casa-patio.webp";
import frontEdificioCortina from "@/assets/front-edificio-cortina.webp";
import frontResidenciaHorizonte from "@/assets/front-residencia-horizonte.webp";
import frontCasaConcreto from "@/assets/front-casa-concreto.webp";
import frontCasaDeLinha from "@/assets/front-casa-de-linha.webp";
import intCasaPatio from "@/assets/int-casa-patio.webp";
import intEdificioCortina from "@/assets/int-edificio-cortina.webp";
import intResidenciaHorizonte from "@/assets/int-residencia-horizonte.webp";
import intCasaConcreto from "@/assets/int-casa-concreto.webp";
import intCasaDeLinha from "@/assets/int-casa-de-linha.webp";
import frontGaleriaLuz from "@/assets/front-galeria-luz.webp";
import frontCasaCampo from "@/assets/front-casa-campo.webp";
import frontEdificioMalha from "@/assets/front-edificio-malha.webp";
import frontCasaSombra from "@/assets/front-casa-sombra.webp";
import frontRefugioSerra from "@/assets/front-refugio-serra.webp";

import gal1 from "@/assets/gal-1.webp";
import gal2 from "@/assets/gal-2.webp";
import gal3 from "@/assets/gal-3.webp";
import gal4 from "@/assets/gal-4.webp";
import gal5 from "@/assets/gal-5.webp";

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: "Residencial" | "Corporativo";
  place: string;
  year: string;
  status: string;
  description: string;
  image: string;
  /** vista frontal completa da construção */
  front: string;
  /** texto de abertura da página do projeto */
  intro: string;
  /** parágrafos do memorial */
  body: string[];
  facts: { label: string; value: string }[];
  gallery: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "casa-patio",
    number: "01",
    title: "Casa Pátio",
    category: "Residencial",
    place: "Chapecó — SC",
    year: "2025",
    status: "Construído",
    description: "Um pátio central organiza a casa e leva luz e ventilação a todos os ambientes.",
    image: project1,
    front: frontCasaPatio,
    intro:
      "Uma casa organizada ao redor do vazio: o pátio central é a sala de estar ao ar livre e o eixo que ordena todos os percursos internos.",
    body: [
      "O terreno urbano, estreito e comprido, pedia uma estratégia capaz de garantir privacidade sem abrir mão da luz. A resposta foi fechar a casa para a rua e abri-la integralmente para dentro.",
      "Os ambientes sociais se voltam para o pátio por grandes panos de vidro de correr, permitindo que a sala, a cozinha e a varanda se tornem um único espaço contínuo quando abertos.",
      "A paleta se limita a concreto aparente, madeira e revestimentos cerâmicos claros. Nada é aplicado como acabamento: cada material é também estrutura ou vedação.",
    ],
    facts: [
      { label: "Área", value: "312 m²" },
      { label: "Programa", value: "Residência unifamiliar" },
      { label: "Equipe", value: "Carraro Bernardi" },
      { label: "Ano", value: "2025" },
    ],
    gallery: [
      { src: detail, alt: "Detalhe do concreto aparente da Casa Pátio" },
      { src: conceptual, alt: "Estudo volumétrico da Casa Pátio" },
          { src: intCasaPatio, alt: "Sala integrada ao pátio central da Casa Pátio" },
      { src: project1, alt: "Vista geral da Casa Pátio" },
      { src: gal1, alt: "Detalhe do concreto aparente — Casa Pátio" },
      { src: gal2, alt: "Estar integrado ao jardim — Casa Pátio" },
      { src: gal3, alt: "Escada de concreto sob luz zenital — Casa Pátio" },
      { src: gal4, alt: "Fachada iluminada ao entardecer — Casa Pátio" },
      { src: gal5, alt: "Encontro de madeira e concreto — Casa Pátio" },
],
  },
  {
    slug: "edificio-cortina",
    number: "02",
    title: "Edifício Cortina",
    category: "Corporativo",
    place: "Chapecó — SC",
    year: "2024",
    status: "Em obra",
    description: "Brises verticais em concreto filtram o sol poente e dão ritmo à fachada urbana.",
    image: project2,
    front: frontEdificioCortina,
    intro:
      "Um edifício corporativo cuja fachada é, antes de tudo, um instrumento climático: a cortina de concreto controla a luz e desenha a presença urbana.",
    body: [
      "A implantação em esquina expõe o edifício ao sol da tarde. Em vez de recuar, o projeto assume essa condição e transforma a proteção solar no seu principal elemento de expressão.",
      "As lâminas verticais têm profundidade variável conforme a orientação, criando uma leitura em movimento para quem percorre a rua.",
      "No térreo, o embasamento recua e devolve área coberta à calçada, ampliando o espaço público.",
    ],
    facts: [
      { label: "Área", value: "4.180 m²" },
      { label: "Programa", value: "Escritórios e térreo comercial" },
      { label: "Status", value: "Em obra" },
      { label: "Ano", value: "2024" },
    ],
    gallery: [
      { src: project3, alt: "Vista da fachada do Edifício Cortina" },
      { src: detail, alt: "Detalhe dos brises verticais em concreto" },
          { src: intEdificioCortina, alt: "Interior do Edifício Cortina com sombras dos brises" },
      { src: project2, alt: "Vista geral do Edifício Cortina" },
      { src: gal1, alt: "Detalhe do concreto aparente — Edifício Cortina" },
      { src: gal2, alt: "Estar integrado ao jardim — Edifício Cortina" },
      { src: gal3, alt: "Escada de concreto sob luz zenital — Edifício Cortina" },
      { src: gal4, alt: "Fachada iluminada ao entardecer — Edifício Cortina" },
      { src: gal5, alt: "Encontro de madeira e concreto — Edifício Cortina" },
],
  },
  {
    slug: "residencia-horizonte",
    number: "03",
    title: "Residência Horizonte",
    category: "Residencial",
    place: "Xanxerê — SC",
    year: "2023",
    status: "Construído",
    description: "Volume horizontal suspenso sobre o declive, com vista contínua para o vale.",
    image: project3,
    front: frontResidenciaHorizonte,
    intro:
      "Uma linha horizontal apoiada em poucos pontos: a casa toca o terreno o mínimo possível para preservar o declive natural e a vista para o vale.",
    body: [
      "O programa social ocupa o nível superior, alinhado à cota de acesso, enquanto os dormitórios se abrigam sob a laje, protegidos pela sombra do balanço.",
      "A estrutura metálica permitiu vãos longos e um canteiro seco, com montagem rápida e pouca interferência na vegetação existente.",
      "Os caixilhos correm de piso a teto e desaparecem na alvenaria, deixando a paisagem como único plano de fundo.",
    ],
    facts: [
      { label: "Área", value: "268 m²" },
      { label: "Programa", value: "Residência de veraneio" },
      { label: "Estrutura", value: "Metálica" },
      { label: "Ano", value: "2023" },
    ],
    gallery: [
      { src: conceptual, alt: "Implantação da Residência Horizonte no declive" },
      { src: project1, alt: "Ambiente interno da Residência Horizonte" },
          { src: intResidenciaHorizonte, alt: "Estar da Residência Horizonte com vista para o vale" },
      { src: detail, alt: "Detalhe construtivo da Residência Horizonte" },
      { src: gal1, alt: "Detalhe do concreto aparente — Residência Horizonte" },
      { src: gal2, alt: "Estar integrado ao jardim — Residência Horizonte" },
      { src: gal3, alt: "Escada de concreto sob luz zenital — Residência Horizonte" },
      { src: gal4, alt: "Fachada iluminada ao entardecer — Residência Horizonte" },
      { src: gal5, alt: "Encontro de madeira e concreto — Residência Horizonte" },
],
  },
  {
    slug: "casa-concreto",
    number: "04",
    title: "Casa Concreto",
    category: "Residencial",
    place: "Chapecó — SC",
    year: "2022",
    status: "Construído",
    description:
      "Paredes de concreto definem uma sequência de pátios, sombras e enquadramentos do jardim.",
    image: detail,
    front: frontCasaConcreto,
    intro:
      "Um único material conduz o projeto do início ao fim: o concreto é estrutura, vedação, acabamento e sombra.",
    body: [
      "A casa se organiza como uma sequência de paredes paralelas que ora se fecham, ora se afastam para abrigar pátios ajardinados.",
      "As fôrmas foram desenhadas junto com o projeto executivo, de modo que as juntas e os furos de ancoragem compõem a modulação das fachadas.",
      "A vegetação amadurece contra o cinza e, ano após ano, muda o modo como a casa é percebida.",
    ],
    facts: [
      { label: "Área", value: "395 m²" },
      { label: "Programa", value: "Residência unifamiliar" },
      { label: "Sistema", value: "Concreto aparente" },
      { label: "Ano", value: "2022" },
    ],
    gallery: [
      { src: project2, alt: "Fachada em concreto aparente da Casa Concreto" },
      { src: studio, alt: "Desenvolvimento do projeto no estúdio" },
          { src: intCasaConcreto, alt: "Interior em concreto aparente da Casa Concreto" },
      { src: project3, alt: "Vista geral da Casa Concreto" },
      { src: gal1, alt: "Detalhe do concreto aparente — Casa Concreto" },
      { src: gal2, alt: "Estar integrado ao jardim — Casa Concreto" },
      { src: gal3, alt: "Escada de concreto sob luz zenital — Casa Concreto" },
      { src: gal4, alt: "Fachada iluminada ao entardecer — Casa Concreto" },
      { src: gal5, alt: "Encontro de madeira e concreto — Casa Concreto" },
],
  },
  {
    slug: "casa-de-linha",
    number: "05",
    title: "Casa de Linha",
    category: "Residencial",
    place: "Joaçaba — SC",
    year: "2021",
    status: "Construído",
    description:
      "Uma composição essencial de planos e vazios aproxima a casa da paisagem e da luz natural.",
    image: conceptual,
    front: frontCasaDeLinha,
    intro:
      "Poucos elementos, bem posicionados: planos horizontais, vazios e uma circulação contínua que costura interior e jardim.",
    body: [
      "O partido nasce da leitura do lote em meio de quadra, com a melhor orientação voltada para os fundos.",
      "A casa se alonga nessa direção e reserva a face norte para a galeria que distribui todos os ambientes.",
      "Detalhes reduzidos ao essencial: rodapés embutidos, iluminação linear e marcenaria integrada à estrutura.",
    ],
    facts: [
      { label: "Área", value: "224 m²" },
      { label: "Programa", value: "Residência unifamiliar" },
      { label: "Equipe", value: "Carraro Bernardi" },
      { label: "Ano", value: "2021" },
    ],
    gallery: [
      { src: project1, alt: "Vista da galeria da Casa de Linha" },
      { src: project3, alt: "Relação da Casa de Linha com o jardim" },
          { src: intCasaDeLinha, alt: "Galeria interna da Casa de Linha" },
      { src: detail, alt: "Detalhe de marcenaria da Casa de Linha" },
      { src: gal1, alt: "Detalhe do concreto aparente — Casa de Linha" },
      { src: gal2, alt: "Estar integrado ao jardim — Casa de Linha" },
      { src: gal3, alt: "Escada de concreto sob luz zenital — Casa de Linha" },
      { src: gal4, alt: "Fachada iluminada ao entardecer — Casa de Linha" },
      { src: gal5, alt: "Encontro de madeira e concreto — Casa de Linha" },
],
  },
  {
    slug: "galeria-luz",
    number: "06",
    title: "Galeria Luz",
    category: "Corporativo",
    place: "Chapecó — SC",
    year: "2025",
    status: "Construído",
    description:
      "Um pavilhão de concreto com abertura única: toda a fachada se torna vitrine para a arte.",
    image: frontGaleriaLuz,
    front: frontGaleriaLuz,
    intro:
      "Um pequeno pavilhão urbano dedicado à exposição: a estrutura de concreto emoldura um vazio contínuo entre a rua e a sala de arte.",
    body: [
      "O lote entre empenas cegas pedia um gesto único. O projeto adota um pórtico de concreto aparente que abraça todo o programa e libera a fachada para o vidro.",
      "Dentro, a planta livre permite reconfigurar a expositiva a cada mostra, com iluminação em trilhos e um lanternim que traz luz natural difusa.",
      "O piso contínuo de concreto polido avança para fora da linha do vidro, tornando a calçada parte da galeria.",
    ],
    facts: [
      { label: "Área", value: "190 m²" },
      { label: "Programa", value: "Galeria de arte" },
      { label: "Equipe", value: "Carraro Bernardi" },
      { label: "Ano", value: "2025" },
    ],
    gallery: [
      { src: frontGaleriaLuz, alt: "Fachada de concreto da Galeria Luz" },
      { src: detail, alt: "Detalhe do concreto aparente da Galeria Luz" },
      { src: conceptual, alt: "Estudo do pórtico estrutural da Galeria Luz" },
      { src: gal1, alt: "Detalhe do concreto aparente — Galeria Luz" },
      { src: gal2, alt: "Estar integrado ao jardim — Galeria Luz" },
      { src: gal3, alt: "Escada de concreto sob luz zenital — Galeria Luz" },
      { src: gal4, alt: "Fachada iluminada ao entardecer — Galeria Luz" },
      { src: gal5, alt: "Encontro de madeira e concreto — Galeria Luz" },
    ],
  },
  {
    slug: "casa-campo",
    number: "07",
    title: "Casa Campo",
    category: "Residencial",
    place: "Coronel Freitas — SC",
    year: "2024",
    status: "Construído",
    description:
      "Um volume horizontal em madeira sobre base de pedra, deitado na linha do campo aberto.",
    image: frontCasaCampo,
    front: frontCasaCampo,
    intro:
      "Uma casa de campo reduzida ao essencial: base de pedra, corpo de madeira e uma cobertura que se estende sobre a paisagem.",
    body: [
      "A implantação evita o ponto mais alto do terreno e se apoia num platô natural, preservando o desenho original do relevo.",
      "Os brises de madeira percorrem toda a extensão da fachada norte, filtrando o sol e mantendo a leitura contínua do volume.",
      "A base em pedra da região resolve o desnível e ancora a casa visualmente ao lugar.",
    ],
    facts: [
      { label: "Área", value: "265 m²" },
      { label: "Programa", value: "Residência de campo" },
      { label: "Equipe", value: "Carraro Bernardi" },
      { label: "Ano", value: "2024" },
    ],
    gallery: [
      { src: frontCasaCampo, alt: "Vista frontal da Casa Campo" },
      { src: conceptual, alt: "Estudo volumétrico da Casa Campo" },
      { src: studio, alt: "Processo de projeto da Casa Campo" },
      { src: gal1, alt: "Detalhe do concreto aparente — Casa Campo" },
      { src: gal2, alt: "Estar integrado ao jardim — Casa Campo" },
      { src: gal3, alt: "Escada de concreto sob luz zenital — Casa Campo" },
      { src: gal4, alt: "Fachada iluminada ao entardecer — Casa Campo" },
      { src: gal5, alt: "Encontro de madeira e concreto — Casa Campo" },
    ],
  },
  {
    slug: "edificio-malha",
    number: "08",
    title: "Edifício Malha",
    category: "Corporativo",
    place: "Chapecó — SC",
    year: "2023",
    status: "Construído",
    description:
      "Uma malha estrutural de concreto branco organiza cinco pavimentos de escritórios.",
    image: frontEdificioMalha,
    front: frontEdificioMalha,
    intro:
      "Um edifício de escritórios em que a estrutura é a própria fachada: a malha regular resolve vãos, sombra e identidade.",
    body: [
      "A modulação de 2,70 m define pilares, caixilhos e divisórias internas, permitindo que cada laje seja ocupada de formas diferentes.",
      "O térreo recua e ganha pé-direito duplo, criando uma varanda urbana coberta na esquina.",
      "O concreto branco recebe apenas polimento leve, sem revestimento aplicado.",
    ],
    facts: [
      { label: "Área", value: "3.640 m²" },
      { label: "Programa", value: "Escritórios" },
      { label: "Equipe", value: "Carraro Bernardi" },
      { label: "Ano", value: "2023" },
    ],
    gallery: [
      { src: frontEdificioMalha, alt: "Fachada em malha de concreto do Edifício Malha" },
      { src: project2, alt: "Vista urbana do Edifício Malha" },
      { src: detail, alt: "Detalhe construtivo do Edifício Malha" },
      { src: gal1, alt: "Detalhe do concreto aparente — Edifício Malha" },
      { src: gal2, alt: "Estar integrado ao jardim — Edifício Malha" },
      { src: gal3, alt: "Escada de concreto sob luz zenital — Edifício Malha" },
      { src: gal4, alt: "Fachada iluminada ao entardecer — Edifício Malha" },
      { src: gal5, alt: "Encontro de madeira e concreto — Edifício Malha" },
    ],
  },
  {
    slug: "casa-sombra",
    number: "09",
    title: "Casa Sombra",
    category: "Residencial",
    place: "Chapecó — SC",
    year: "2023",
    status: "Construído",
    description:
      "Volumes brancos e um brise de madeira criam um terraço profundo, sempre à sombra.",
    image: frontCasaSombra,
    front: frontCasaSombra,
    intro:
      "Uma casa urbana organizada em torno da sombra: a laje avançada e o painel vazado de madeira definem a vida entre dentro e fora.",
    body: [
      "O pavimento superior avança sobre o térreo e protege toda a frente social da casa, criando um terraço de uso permanente.",
      "O painel de madeira corrediço ajusta a privacidade em relação à rua sem bloquear a ventilação cruzada.",
      "O jardim tropical completa o filtro entre a casa e o passeio público.",
    ],
    facts: [
      { label: "Área", value: "340 m²" },
      { label: "Programa", value: "Residência unifamiliar" },
      { label: "Equipe", value: "Carraro Bernardi" },
      { label: "Ano", value: "2023" },
    ],
    gallery: [
      { src: frontCasaSombra, alt: "Fachada e terraço sombreado da Casa Sombra" },
      { src: intCasaPatio, alt: "Ambiente interno integrado da Casa Sombra" },
      { src: detail, alt: "Detalhe do brise de madeira da Casa Sombra" },
      { src: gal1, alt: "Detalhe do concreto aparente — Casa Sombra" },
      { src: gal2, alt: "Estar integrado ao jardim — Casa Sombra" },
      { src: gal3, alt: "Escada de concreto sob luz zenital — Casa Sombra" },
      { src: gal4, alt: "Fachada iluminada ao entardecer — Casa Sombra" },
      { src: gal5, alt: "Encontro de madeira e concreto — Casa Sombra" },
    ],
  },
  {
    slug: "refugio-serra",
    number: "10",
    title: "Refúgio Serra",
    category: "Residencial",
    place: "Bom Jardim da Serra — SC",
    year: "2022",
    status: "Construído",
    description:
      "Um cubo de concreto no alto do vale, com fendas verticais que enquadram a neblina.",
    image: frontRefugioSerra,
    front: frontRefugioSerra,
    intro:
      "Um refúgio mínimo: um único volume de concreto moldado in loco, aberto apenas onde a paisagem merece ser vista.",
    body: [
      "A construção remota exigiu simplicidade radical: uma forma compacta, poucos materiais e sistemas autônomos de energia e água.",
      "As fendas verticais controlam o vento constante da serra e transformam cada abertura em um enquadramento preciso do vale.",
      "O interior é um espaço único, com lareira central e mobiliário fixo em madeira.",
    ],
    facts: [
      { label: "Área", value: "68 m²" },
      { label: "Programa", value: "Refúgio" },
      { label: "Equipe", value: "Carraro Bernardi" },
      { label: "Ano", value: "2022" },
    ],
    gallery: [
      { src: frontRefugioSerra, alt: "Volume de concreto do Refúgio Serra na neblina" },
      { src: conceptual, alt: "Estudo do Refúgio Serra" },
      { src: detail, alt: "Detalhe do concreto moldado do Refúgio Serra" },
      { src: gal1, alt: "Detalhe do concreto aparente — Refúgio Serra" },
      { src: gal2, alt: "Estar integrado ao jardim — Refúgio Serra" },
      { src: gal3, alt: "Escada de concreto sob luz zenital — Refúgio Serra" },
      { src: gal4, alt: "Fachada iluminada ao entardecer — Refúgio Serra" },
      { src: gal5, alt: "Encontro de madeira e concreto — Refúgio Serra" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}

export function getRelatedProjects(slug: string, limit = 6) {
  const current = getProject(slug);
  if (!current) return [];
  const others = projects.filter((project) => project.slug !== slug);
  const sameCategory = others.filter((project) => project.category === current.category);
  const rest = others.filter((project) => project.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
