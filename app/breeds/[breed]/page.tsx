import { notFound } from 'next/navigation';
import { RatingDisplay } from '@/components/rating-display';
import { PuppyCarousel } from '@/components/puppy-carousel';

interface BreedData {
  name: string
  description: string
  image: string
  characteristics: {
    label: string
    rating: number
  }[]
  specs: {
    label: string
    value: string
  }[]
}

const breedData: Record<string, BreedData> = {
  'shih-tzu': {
    name: 'Shih Tzu',
    description: `O Shih Tzu é uma raça de cães pequenos e adoráveis, reconhecida por sua beleza 
    e temperamento afetuoso. Com um porte compacto, esses cães têm altura entre 20 
    a 28 cm e peso que varia de 4,5 a 8 kg. Sua pelagem longa, densa e sedosa é uma 
    de  suas  características  mais  marcantes.  Seu  focinho  curto  e  achatado,  olhos 
    grandes e expressivos e uma cauda curvada sobre o dorso conferem ao Shih Tzu 
    um visual encantador.  

    Esses cães são conhecidos por seu temperamento dócil e sociável. Extremamente 
    apegados à família, adoram estar na companhia de seus tutores e geralmente se 
    dão bem com crianças e outros animais. Além disso, são brincalhões e têm uma 
    energia  moderada, apreciando momentos de diversão e caminhadas leves. Uma 
    excelente  escolha  para  quem  busca  um cão de pequeno porte e extremamente 
    afetuoso`,
    image: '/images/shihtzu.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outras cães', rating: 5 },
      { label: 'Atividade com crianças', rating: 5 },
      { label: 'Proteção', rating: 2 },
      { label: 'Tolerância ao calor', rating: 2 },
      { label: 'Tolerância ao frio', rating: 3 },
      { label: 'Necessidade de exercício', rating: 2 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 4 },
      { label: 'Cuidados com a higiene do cão', rating: 4 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '10 a 16 anos' },
      { label: 'Tamanho adulto', value: 'pequeno' },
      { label: 'Cor', value: 'pretos, cinza, marrom ou branco ' },
      { label: 'Pelo', value: 'longo' },
      { label: 'Tempo regular banho', value: '15 dias' },
      { label: 'Altura', value: '20-28cm' },
      { label: 'Peso', value: '4kg - 7,5kg' },
      { label: 'Frequência de banho', value: '7 a 15 dias' }
    ]
  },
  'golden': {
    name: 'Golden Retriever',
    description: `Com  sua  aparência  amigável  e  personalidade  brincalhona,  eles  conquistam 
    corações onde quer que vão. Fisicamente, o Golden Retriever é um cão de porte 
    médio a grande, com altura que varia entre 51 e 61 cm e peso entre 25 e 40 kg, 
    dependendo do sexo. 

    Sua pelagem é densa, resistente à água, e pode ser ondulada 
    ou lisa, com um subpelo macio que oferece proteção contra o frio e a umidade.  
    Uma  de  suas  qualidades  mais  marcantes  é  seu  temperamento  extremamente 
    amigável, brincalhão, leal e sociável. É um cão que ama a companhia humana e se 
    dá bem com crianças, outros cães e até mesmo estranhos, sendo conhecido por 
    sua natureza não agressiva. Além disso, é uma raça inteligente e fácil de treinar, 
    frequentemente  destacando-se  em  esportes  caninos  e  como  cão  de assistência 
    para pessoas com deficiências ou necessidades especiais. `,
    image: '/images/golden.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outras cães', rating: 5 },
      { label: 'Atividade com crianças', rating: 5 },
      { label: 'Proteção', rating: 2 },
      { label: 'Tolerância ao calor', rating: 2 },
      { label: 'Tolerância ao frio', rating: 4 },
      { label: 'Necessidade de exercício', rating: 5 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 5 },
      { label: 'Cuidados com a higiene do cão', rating: 3 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '10 a 12 anos' },
      { label: 'Tamanho adulto', value: 'grande' },
      { label: 'Cor', value: 'Dourado em várias tonalidades' },
      { label: 'Pelo', value: 'Longo' },
      { label: 'Tempo regular banho', value: '15 a 30 dias' },
      { label: 'Altura', value: '51-61cm' },
      { label: 'Peso', value: '25-40kg' }
    ]
  },
  'bulldog-frances': {
    name: 'Bulldog Francês',
    description: `O Buldogue Francês é um cão de pequeno porte, mas com uma presença marcante 
    e  cativante.  Reconhecido  por  suas  orelhas  eretas  e  pelo  rosto  achatado  e 
    expressivo,  essa  raça  é  encantadora.  Possuem  um  corpo  musculoso  e  bem 
    proporcionado. Seu peso geralmente varia entre 8 e 14 kg, e sua altura fica entre 25 
    e 35 cm. A pelagem é curta e macia, com um brilho natural que exige manutenção 
    mínima. As dobrinhas faciais conferem um charme adicional.  

    Uma das características mais adoráveis do Buldogue Francês é seu temperamento. 
    Eles  são  cães  sociáveis  e  companheiros,  conhecidos  por  sua  lealdade  e  por 
    estarem sempre em busca de atenção e carinho. São brincalhões, mas equilibrados, 
    o  que  os  torna  excelentes  para  famílias,  inclusive  aquelas  com  crianças.  É 
    importante  monitorar  seu  conforto  em  atividades  ao  ar  livre  e  garantir que eles 
    descansem  adequadamente.  Essa  raça  é  uma  escolha  maravilhosa  para  quem 
    busca um cão carinhoso, de baixa manutenção e que se adapta bem a ambientes 
    pequenos, como apartamento. `,
    image: '/images/buldogue.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outras cães', rating: 5 },
      { label: 'Atividade com crianças', rating: 5 },
      { label: 'Proteção', rating: 2 },
      { label: 'Tolerância ao calor', rating: 1 },
      { label: 'Tolerância ao frio', rating: 4 },
      { label: 'Necessidade de exercício', rating: 4 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 5 },
      { label: 'Cuidados com a higiene do cão', rating: 3 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '10 a 12 anos' },
      { label: 'Tamanho adulto', value: 'Médio' },
      { label: 'Cor', value: 'Fulvo, tigrado, branco, creme e preto' },
      { label: 'Pelo', value: 'Curto, liso e denso' },
      { label: 'Tempo regular banho', value: '15 a 30 dias' },
      { label: 'Altura', value: '30-35cm' },
      { label: 'Peso', value: '8-14kg' }
    ]
  },
  'spitz-alemao': {
    name: 'Spitz Alemão',
    description: `O  Lulu  da Pomerânia, também conhecido como Spitz Alemão Anão, é uma das 
    raças  de  cães  mais  encantadoras  e  populares,  reconhecidos  por  seu  tamanho 
    pequeno  e  aparência  fofa.  Fisicamente,  o  Lulu  da  Pomerânia  é  pequeno  e 
    compacto, pesando entre 1,8 e 3,5 kg, com altura entre 18 e 22 cm. Sua pelagem é 
    longa, fofa e abundante, com uma textura macia e um subpelo denso que o protege 
    do frio.  

    No  que  diz  respeito  ao  temperamento,  o  Lulu  da  Pomerânia  é  incrivelmente 
    animado, inteligente e afetuoso. É um cão cheio de energia e muito curioso, sempre 
    disposto a explorar o ambiente ao seu redor. O Lulu adora estar perto de sua família 
    e  pode  ser  bastante  protetor,  latindo  para  alertar  sobre  qualquer  novidade  ou 
    visitante inesperado. Além disso, é um cão brincalhão e carinhoso, tornando-se uma 
    ótima companhia para adultos e crianças que saibam lidar com sua delicadeza. `,
    image: '/images/lulu.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outras cães', rating: 4 },
      { label: 'Atividade com crianças', rating: 3 },
      { label: 'Proteção', rating: 2 },
      { label: 'Tolerância ao calor', rating: 2 },
      { label: 'Tolerância ao frio', rating: 4 },
      { label: 'Necessidade de exercício', rating: 2 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 3 },
      { label: 'Cuidados com a higiene do cão', rating: 3 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '12 a 16 anos' },
      { label: 'Tamanho adulto', value: 'Pequeno' },
      { label: 'Cor', value: 'Branco, preto, laranja, marrom, azul e creme' },
      { label: 'Pelo', value: 'Longo' },
      { label: 'Tempo regular banho', value: '15 a 30 dias' },
      { label: 'Altura', value: '18-24cm' },
      { label: 'Peso', value: '1,5kg-3,5kg' }
    ]
  },
  'chiuaua': {
    name: 'Chiuaua',
    description: `O  Chihuahua  é  uma  das  menores  raças  de  cães  do  mundo,  mas  o  tamanho 
    reduzido é compensado por uma personalidade vibrante e destemida. Esses cães 
    possuem uma altura que varia entre 15 a 23 cm e peso de até 3 kg. Sua aparência 
    pode variar, com dois tipos principais de pelagem: lisa e curta, ou longa e sedosa.  

    Apesar do pequeno tamanho, o Chihuahua tem uma personalidade marcante. São 
    extremamente  leais  e  apegados  aos  seus  tutores,  muitas  vezes  formando  um 
    vínculo mais forte com uma pessoa específica na casa. Sua coragem é notável, e 
    eles  frequentemente  se  comportam  como  se  fossem  muito  maiores  do  que 
    realmente  são.  Seu  tamanho  reduzido e energia o tornam ideal para a vida em 
    apartamentos, mas precisam de caminhadas regulares para se manterem saudáveis 
    e felizes. Com sua combinação de charme, inteligência e apego, o Chihuahua é 
    uma ótima escolha para quem procura um companheiro de pequeno porte, mas com 
    um coração enorme e uma personalidade inesquecível.  `,
    image: '/images/chiuaua.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outras cães', rating: 3 },
      { label: 'Atividade com crianças', rating: 3 },
      { label: 'Proteção', rating: 4 },
      { label: 'Tolerância ao calor', rating: 3 },
      { label: 'Tolerância ao frio', rating: 2 },
      { label: 'Necessidade de exercício', rating: 2 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 4 },
      { label: 'Cuidados com a higiene do cão', rating: 3 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '12 a 20 anos' },
      { label: 'Tamanho adulto', value: 'Pequeno' },
      { label: 'Cor', value: 'Preto, branco, marrom, creme' },
      { label: 'Pelo', value: 'Curto ou longo' },
      { label: 'Tempo regular banho', value: '15 a 30 dias' },
      { label: 'Altura', value: '15-23cm' },
      { label: 'Peso', value: '1,5-3kg' }
    ]
  },
  'samoieda': {
    name: 'Samoieada',
    description: `O  Samoieda  é  uma  raça encantadora. Esse cão de porte grande apresenta um 
    corpo  robusto,  com  altura  entre  50  e  60  cm  e  peso  variando  de  20  a  40  kg, 
    dependendo do sexo. Sua pelagem é um de seus traços mais marcantes: densa, 
    dupla,  incrivelmente  macia  e  branca  como  a neve. Seus olhos escuros e vivos, 
    combinados  com  uma  boca  que  parece  curvada  para  cima,  dão  a  eles  sua 
    expressão característica de "cão sorridente". 

    A personalidade do Samoieda é tão notável quanto sua aparência. Ele é um cão 
    extrovertido,  gentil e sociável, que adora estar em companhia de pessoas. Essa 
    natureza  afetuosa  o  torna  ótimo  com  crianças  e  outros  animais,  mas  também 
    significa que ele não gosta de ficar sozinho por longos períodos. O Samoieda é 
    brincalhão e inteligente, mas pode ser independente em algumas situações. Ideal 
    para famílias que buscam um companheiro sociável e energético, é uma escolha 
    que traz alegria e beleza a qualquer lar.`,
    image: '/images/samoieda.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outras cães', rating: 5 },
      { label: 'Atividade com crianças', rating: 5 },
      { label: 'Proteção', rating: 4 },
      { label: 'Tolerância ao calor', rating: 1 },
      { label: 'Tolerância ao frio', rating: 5 },
      { label: 'Necessidade de exercício', rating: 5 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 3 },
      { label: 'Cuidados com a higiene do cão', rating: 3 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '12 a 16 anos' },
      { label: 'Tamanho adulto', value: 'Grande' },
      { label: 'Cor', value: 'Branco' },
      { label: 'Pelo', value: 'Longo' },
      { label: 'Tempo regular banho', value: '15 a 30' },
      { label: 'Altura', value: '53-60cm' },
      { label: 'Peso', value: '23-35kg' }
    ]
  },
  'husky-siberiano': {
    name: 'Husky Siberiano',
    description: `Com  sua  aparência  marcante  e  temperamento  enérgico,  o  Husky  é  hoje  uma 
    escolha  popular  como  animal  de  companhia.  Fisicamente,  é  um  cão  de  porte 
    grande, com altura variando entre 50 e 60 cm e peso entre 16 e 37 kg, dependendo 
    do sexo. As cores da pelagem vão do branco puro a combinações de cinza, preto, 
    vermelho ou castanho, geralmente com marcas características na face. Seus olhos 
    podem ser azuis, verdes, castanhos ou apresentar heterocromia (um olho de cada 
    cor), o que contribui para sua aparência fascinante. A cauda é espessa e curva 
    levemente sobre o dorso, um traço típico da raça. 

    Em termos de personalidade, o Husky Siberiano é um cão enérgico, independente e 
    amigável.  Apesar  de  sua  aparência  e  postura  autoritária,  é  uma  raça  bastante 
    carinhosa e sociável com pessoas e outros animais. Não é um cão de guarda típico, 
    pois  tende  a  ser  amigável  até  mesmo  com  estranhos,  mas  seu  entusiasmo  e 
    energia  o  tornam  um  excelente  companheiro  para  famílias  ativas  que  apreciam 
    aventuras ao ar livre.`,
    image: '/images/husky.jpg',
    characteristics: [
      { label: 'Carinho', rating: 5 },
      { label: 'Convívio com outras cães', rating: 4 },
      { label: 'Atividade com crianças', rating: 3 },
      { label: 'Proteção', rating: 4 },
      { label: 'Tolerância ao calor', rating: 2 },
      { label: 'Tolerância ao frio', rating: 5 },
      { label: 'Necessidade de exercício', rating: 5 },
      { label: 'Apego ao dono', rating: 5 },
      { label: 'Facilidade de treinamento', rating: 5 },
      { label: 'Cuidados com a higiene do cão', rating: 3 }
    ],
    specs: [
      { label: 'Expectativa de vida', value: '12 a 15 anos' },
      { label: 'Tamanho adulto', value: 'Grande' },
      { label: 'Cor', value: 'Cinza e branco, preto e branco, marrom e branco' },
      { label: 'Pelo', value: 'Longo' },
      { label: 'Tempo regular banho', value: '15 a 30 dias' },
      { label: 'Altura', value: '53-60cm' },
      { label: 'Peso', value: '20-30kg' }
    ]
  }
};

export default function BreedPage({ params }: { params: { breed: string } }) {
  const breed = breedData[params.breed];

  if (!breed) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Column - Image */}
        <div className="space-y-6">
          <div className="aspect-square border-2 border-gray-200 rounded-lg">
            <img src={`${breed.image}`} alt={breed.name} className="w-full h-full object-cover rounded-lg" />
          </div>
          <PuppyCarousel breed={params.breed} />
        </div>

        {/* Right Column - Content */}
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-serif text-[#253c3c]">{breed.name}</h1>

          <div className="prose max-w-none">
            {breed.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-sm md:text-base text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Specifications */}
          <div className="space-y-2">
            {breed.specs.map((spec) => (
              <div key={spec.label} className="flex items-center">
                <span className="text-xs md:text-sm">• {spec.label}:</span>
                <span className="text-xs md:text-sm ml-2">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Characteristics Ratings */}
          <div className="space-y-3">
            {breed.characteristics.map((char) => (
              <div key={char.label} className="flex items-center gap-4">
                <span className="text-xs md:text-sm w-32 md:w-48">{char.label}</span>
                <RatingDisplay rating={char.rating} />
              </div>
            ))}
          </div>

          {/* Action Button */}
          <a 
            href={`https://wa.me/5551999965953?text=Olá,%20bom%20dia!Tenho%20interesse%20em%20saber%20mais%20sobre%20os%20filhotes%20da%20raça%20${breed.name}`}
            className="w-full bg-[#4A290D] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors text-sm md:text-base text-center block"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Entrar em contato
          </a>
        </div>
      </div>
    </div>
  );
}

