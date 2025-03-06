/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import './page.css';

const breeds = [
  { name: 'Shih Tzu' },
  { name: 'Golden Retriver' },
  { name: 'Bulldog Frances' },
  { name: 'Samoieda' },
  { name: 'Chihuahua' },
  { name: 'Husky Siberiano' },
  { name: 'Spitz Alemao' }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <section className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="border-4 border-[#4A290D] bg-[#4A290D] rounded-sm p-2 mb-12 flex justify-self-center">
          <div className="grid grid-cols-[3fr_2fr] w-full gap-4 lg:h-[300px] sm:h-[250px] md:h-[300px]">
            <div className="bg-[#f5f3f0] border-2 border-gray-200 rounded-sm flex items-center justify-center p-4">
              <p className="text-center font-dancing font-semibold textAnimated lg:text-[26px] text-[#4A290D]">
                Criação com amor!
              </p>
            </div>
            <div className="border-2 border-gray-200 rounded-sm bg-[#f5f3f0] flex items-center">
              <Image
                src={'/images/logo_final.png'}
                alt={'logo'}
                width={275}
                height={275}
                className="aspect-square rounded-lg mb-2 object-contain bg-[#f5f3f0] justify-self-center self-center "
              />
            </div>
          </div>
        </div>

        <div className="absolute inline-block mb-6 left-0 w-[20%] text-center ">
          <h2 className="bg-[#4A290D] text-white px-4 py-1 text-lg md:text-xl realtive z-10 rounded-r-full tracking-[1rem] w-min">
            Raças
          </h2>
        </div>
        {/* Breeds Section */}
        <div className="mb-12 pt-12 p-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {breeds.map((breed) => (
              <Link
                key={breed.name}
                href={`/breeds/${breed.name
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
                className="group"
              >
                <Card className="border-none hover:shadow-lg transition-shadow">
                  <CardContent className="p-2 md:p-3">
                    <Image
                      src={`/images/breeds/${breed.name
                        .toLowerCase()
                        .replace(/\s+/g, '')}.jpg`}
                      alt={'schitzu'}
                      width={300}
                      height={300}
                      className="aspect-square border-2 border-gray-200 rounded-lg mb-2 object-cover"
                    />
                    <h3 className="text-center text-xs md:text-sm font-medium">
                      {breed.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="mt-16">
          <div className="relative h-[200px] md:h-[300px] w-full mb-8">
            <Image
              src="/images/fullImage.jpg"
              alt="Relaxed dog"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: '50% 70%' }}
              className="w-full h-full rounded-lg"
            />
          </div>

          <div className="bg-[#4A290D] rounded-lg p-4 md:p-8 text-white mb-16">
            <h2 className="text-xl md:text-2xl text-center mb-6 md:mb-8 font-serif border-b-2 border-white w-[50%] place-self-center">
              Depoimentos de clientes
            </h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <p className="mb-4 text-sm md:text-base italic">
                "Hoje levei a BB no veterinário, e ele me falou pra eu dar
                  parabéns a vcs pq a BB está em excelente saúde física, mental
                  .... Elogiou muito…"
                </p>
                {/* <span className="text-xs md:text-sm opacity-75">
                  - Ricardo Santos
                </span> */}
              </div>
              <div className="text-center">
                <p className="mb-4 text-sm md:text-base italic">
                "Lugar incrível, onde os animais são muito bem cuidados e
                  recebem muito amor e carinho, recomendo 100%!"
                </p>
                {/* <span className="text-xs md:text-sm opacity-75">
                  - Fernanda Santos
                </span> */}
              </div>
              <div className="text-center">
                <p className="mb-4 text-sm md:text-base italic">
                "Ontem tivemos que levar ele numa veterinária, ela ficou
                  impressionada com a “pureza”….ela disse que fazia tempo que
                  não via um Shih tzu tão perfeito…."
                </p>
                {/* <span className="text-xs md:text-sm opacity-75">
                  - Sofia Santos
                </span> */}
              </div>
            </div>
          </div>

          {/* Our History Section */}
          <div className="mb-16">
            <div className="relative text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-serif inline-block px-4 bg-[#f5f3f0] relative z-10">
                Nossa Historia
              </h2>
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-300 -z-0" />
            </div>

            <div className="flex flex-col gap-8">
              <div className="space-y-4 md:space-y-6">
                <p className="text-sm md:text-base text-gray-600">
                  O Otto Canil foi inaugurado em 2019, fruto da paixão de Marcos
                  pelos animais e do seu objetivo de preservar as raças puras.
                  Ele sempre sonhou em criar um espaço dedicado a esse
                  propósito, onde pudesse conciliar seu amor pelos animais com a
                  oportunidade de oferecer um ambiente que garantisse o
                  bem-estar deles.
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  Infelizmente, em 2021, Marcos faleceu, deixando um legado de
                  carinho pelos cães e um sonho que precisava ser continuado.
                  Seus filhos, também apaixonados pelos animais e com o desejo
                  de honrar a memória do pai, assumiram o canil.
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  Determinados a preservar o compromisso com o cuidado e a
                  preservação das raças puras, eles seguem com a missão de
                  tornar o Otto Canil como referência para todos os amantes de
                  cães, mantendo vivo o legado de amor e dedicação
                  criado pelo pai
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4 sm:grid-rows-2 md:grid-rows-1">
                <div className="aspect-square border-2 border-gray-200 rounded-lg relative">
                  <Image
                    src="/images/nossa_historia3.jpg"
                    alt="our history" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div className="aspect-square border-2 border-gray-200 rounded-lg relative">
                  <Image
                    src="/images/nossa_historia2.jpg"
                    alt="our history"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div className="aspect-square border-2 border-gray-200 rounded-lg relative">
                  <Image
                    src="/images/nossa_historia.jpg"
                    alt="our history"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div className="aspect-square border-2 border-gray-200 rounded-lg relative">
                  <Image
                    src="/images/nossa_historia4.jpg"
                    alt="our history"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
