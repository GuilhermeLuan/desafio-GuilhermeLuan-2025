import { baseDeAnimais } from "./base-de-animais.js";

class AbrigoAnimais {
  constructor() {
    this.animaisPorPessoa = { pessoa1: [], pessoa2: [] };
  }

  verificaOrdemBrinquedos(brinquedosAnimal, brinquedosPessoa) {
    let indiceAnimal = 0;
    
    for (const brinquedo of brinquedosPessoa) {
      if (indiceAnimal < brinquedosAnimal.length && brinquedo === brinquedosAnimal[indiceAnimal]) {
        indiceAnimal++;
      }
    }
    
    return indiceAnimal === brinquedosAnimal.length;
  }

  gatoCompartilhaBrinquedos(animal, outroAnimal) {
    if (animal.tipo === 'gato' || outroAnimal.tipo === 'gato') {
      const brinquedosAnimal = new Set(animal.brinquedos);
      const brinquedosOutro = new Set(outroAnimal.brinquedos);
      
      for (const brinquedo of brinquedosAnimal) {
        if (brinquedosOutro.has(brinquedo)) {
          return true;
        }
      }
    }
    return false;
  }

  verificaLocoComCompanhia(animal, animaisAdotados) {
    return animal.nome === 'Loco' && animaisAdotados.length > 0;
  }

  encontrarAnimaisCompativeis(baseDeAnimais, brinquedosPessoa, nomeDoAnimal, pessoa) {
    const animal = baseDeAnimais.find(a => a.nome === nomeDoAnimal);
    if (!animal) return [];

    if (this.animaisPorPessoa[pessoa].length >= 3) {
      return [];
    }

    const locoComCompanhia = this.verificaLocoComCompanhia(animal, this.animaisPorPessoa[pessoa]);
    
    let temBrinquedosCorretos;
    if (locoComCompanhia) {
      temBrinquedosCorretos = animal.brinquedos.every(brinquedo => 
        brinquedosPessoa.includes(brinquedo)
      );
    } else {
      temBrinquedosCorretos = this.verificaOrdemBrinquedos(animal.brinquedos, brinquedosPessoa);
    }

    if (!temBrinquedosCorretos) {
      return [];
    }

    for (const animalAdotado of this.animaisPorPessoa[pessoa]) {
      if (this.gatoCompartilhaBrinquedos(animal, animalAdotado)) {
        return [];
      }
    }

    return [animal];
  }

  verificaAnimalInvalido (nomeDoAnimal) {
    const animalEncontrado = baseDeAnimais.find(
      (animal) => animal.nome === nomeDoAnimal
    );

    return !animalEncontrado;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    this.animaisPorPessoa = { pessoa1: [], pessoa2: [] };
    
    brinquedosPessoa1 = brinquedosPessoa1.split(",");
    brinquedosPessoa2 = brinquedosPessoa2.split(",");
    ordemAnimais = ordemAnimais.split(",");

    const resultado = {
      lista: [],
    };

    for (const nomeAnimal of ordemAnimais){
      if (this.verificaAnimalInvalido(nomeAnimal)){
        return {
          erro: 'Animal inválido'
        }
      }
    }

    for (const nomeAnimal of ordemAnimais) {
      const animaisCompatveisPessoa1 = this.encontrarAnimaisCompativeis(
        baseDeAnimais,
        brinquedosPessoa1,
        nomeAnimal,
        'pessoa1'
      );
      
      const animaisCompatveisPessoa2 = this.encontrarAnimaisCompativeis(
        baseDeAnimais,
        brinquedosPessoa2,
        nomeAnimal,
        'pessoa2'
      );

      if (animaisCompatveisPessoa1.length > 0 && animaisCompatveisPessoa2.length > 0) {
        resultado.lista.push(`${nomeAnimal} - abrigo`);
      } else if (animaisCompatveisPessoa1.length > 0) {
        resultado.lista.push(`${nomeAnimal} - pessoa 1`);
        this.animaisPorPessoa.pessoa1.push(animaisCompatveisPessoa1[0]);
      } else if (animaisCompatveisPessoa2.length > 0) {
        resultado.lista.push(`${nomeAnimal} - pessoa 2`);
        this.animaisPorPessoa.pessoa2.push(animaisCompatveisPessoa2[0]);
      } else {
        resultado.lista.push(`${nomeAnimal} - abrigo`);
      }
    }

    // Ordenar resultado alfabeticamente
    resultado.lista.sort((a, b) => {
      const nomeA = a.split(" - ")[0];
      const nomeB = b.split(" - ")[0];
      return nomeA.localeCompare(nomeB);
    });

    return resultado;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
