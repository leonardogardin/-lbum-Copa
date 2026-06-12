import { Sticker, Student } from './types';
import { customStudents, customStickers, customLastUpdated } from './customDefaultData';

import joaoPhoto from './assets/images/joao_real_1781222847285.jpg';
import willyanPhoto from './assets/images/willyan_real_1781222856442.jpg';
import mariaPhoto from './assets/images/maria_real_1781222865772.jpg';
import paulaPhoto from './assets/images/paula_real_1781222876982.jpg';
import perolaPhoto from './assets/images/perola_real_1781222884026.jpg';
import rhillaryPhoto from './assets/images/rhillary_real_1781222893069.jpg';
import adrianaPhoto from './assets/images/adriana_real_1781222902232.jpg';
import vandaPhoto from './assets/images/vanda_real_1781222912086.jpg';

const defaultStickers: Sticker[] = [
  // ROW 1: Teachers & João
  {
    id: 'adriana',
    name: 'Adriana',
    category: 'teachers',
    number: '01',
    avatarKey: 'adriana',
    customImage: adrianaPhoto,
    badgeText: 'PROFESSORA',
    description: 'Nossa querida pró!'
  },
  {
    id: 'vanda',
    name: 'Vanda',
    category: 'teachers',
    number: '02',
    avatarKey: 'vanda',
    customImage: vandaPhoto,
    badgeText: 'PROFESSORA',
    description: 'Nossa mestre dedicada!'
  },
  {
    id: 'edilaine',
    name: 'Edilaine',
    category: 'teachers',
    number: '03',
    avatarKey: 'edilaine',
    badgeText: 'PROFESSORA',
    description: 'Sempre apoiando os estudos!'
  },
  {
    id: 'rayssa',
    name: 'Rayssa',
    category: 'students',
    number: '04',
    avatarKey: 'rayssa',
    badgeText: 'ALUNA',
    description: 'Estudiosa e dedicada às aulas!'
  },
  {
    id: 'joao',
    name: 'João',
    category: 'students',
    number: '05',
    avatarKey: 'joao',
    customImage: joaoPhoto,
    badgeText: 'ALUNO',
    description: 'Craque nota 10 da turma!'
  },

  // ROW 2: Rest of Students
  {
    id: 'paula',
    name: 'Paula',
    category: 'students',
    number: '06',
    avatarKey: 'paula',
    customImage: paulaPhoto,
    badgeText: 'ALUNA',
    description: 'Estrela brilhante da sala!'
  },
  {
    id: 'perola',
    name: 'Pérola',
    category: 'students',
    number: '07',
    avatarKey: 'perola',
    customImage: perolaPhoto,
    badgeText: 'ALUNA',
    description: 'Joia preciosa da nossa turma!'
  },
  {
    id: 'rhillary',
    name: 'Rhillary',
    category: 'students',
    number: '08',
    avatarKey: 'rhillary',
    customImage: rhillaryPhoto,
    badgeText: 'ALUNA',
    description: 'Irradia alegria por onde passa!'
  },
  {
    id: 'willyan',
    name: 'Willyan',
    category: 'students',
    number: '09',
    avatarKey: 'willyan',
    customImage: willyanPhoto,
    badgeText: 'ALUNO',
    description: 'Grande amigo e super focado!'
  },
  {
    id: 'maria_isabelly',
    name: 'Maria Isabelly',
    category: 'students',
    number: '10',
    avatarKey: 'maria_isabelly',
    customImage: mariaPhoto,
    badgeText: 'ALUNA',
    description: 'Sábia, atenta e super dedicada!'
  },

  // ROW 3: Specials
  {
    id: 'craque_leitura',
    name: 'Craque da Leitura',
    category: 'specials',
    number: '11',
    avatarKey: 'craque_leitura',
    badgeText: 'CONQUISTA',
    description: 'Para quem adora viajar nos mundos dos livros!'
  },
  {
    id: 'assiduo',
    name: 'Assíduo',
    category: 'specials',
    number: '12',
    avatarKey: 'assiduo',
    badgeText: 'CONQUISTA',
    description: 'Presença garantida e pontualidade exemplar!'
  },
  {
    id: 'fifa_logo',
    name: 'FIFA 2026',
    category: 'specials',
    number: '13',
    avatarKey: 'fifa_logo',
    badgeText: 'TAÇA COPA',
    description: 'O emblema oficial da competição!'
  },
  {
    id: 'endrick',
    name: 'Endrick',
    category: 'stars',
    number: '14',
    avatarKey: 'endrick',
    badgeText: 'ESTRELA',
    description: 'O jovem craque da nossa Seleção!'
  },
  {
    id: 'vini_jr',
    name: 'Vini Jr.',
    category: 'stars',
    number: '15',
    avatarKey: 'vini_jr',
    badgeText: 'ESTRELA',
    description: 'Alegria, ousadia e drible bonito!'
  },

  // ROW 4: Star Players
  {
    id: 'neymar',
    name: 'Neymar Jr',
    category: 'stars',
    number: '16',
    avatarKey: 'neymar',
    badgeText: 'ESTRELA',
    description: 'Habilidade de gênio nos gramados!'
  },
  {
    id: 'mbappe',
    name: 'Mbappé',
    category: 'stars',
    number: '17',
    avatarKey: 'mbappe',
    badgeText: 'ESTRELA',
    description: 'Velocidade e finalização incrível!'
  },
  {
    id: 'cr7',
    name: 'C. Ronaldo',
    category: 'stars',
    number: '18',
    avatarKey: 'cr7',
    badgeText: 'ESTRELA',
    description: 'Foco, determinação e muitos gols!'
  },
  {
    id: 'messi',
    name: 'Lionel Messi',
    category: 'stars',
    number: '19',
    avatarKey: 'messi',
    badgeText: 'ESTRELA',
    description: 'Magia pura conduzindo a bola!'
  }
];

const defaultStudents: Student[] = [
  {
    id: 's_joao',
    name: 'João',
    avatarKey: 'joao',
    customImage: joaoPhoto,
    notes: 'Ama futebol e está motivado a conseguir todas as figurinhas!',
    stickers: {
      'vanda': true,
      'edilaine': true,
      'joao': true,
      'endrick': true
    }
  },
  {
    id: 's_maria_isabelly',
    name: 'Maria Isabelly',
    avatarKey: 'maria_isabelly',
    customImage: mariaPhoto,
    notes: 'Sempre lê mais livros que todo mundo!',
    stickers: {
      'adriana': true,
      'maria_isabelly': true,
      'craque_leitura': true,
      'vini_jr': true
    }
  },
  {
    id: 's_paula',
    name: 'Paula',
    avatarKey: 'paula',
    customImage: paulaPhoto,
    notes: 'Super sorridente, adora incentivar os amigos.',
    stickers: {
      'edilaine': true,
      'paula': true,
      'fifa_logo': true
    }
  },
  {
    id: 's_perola',
    name: 'Pérola',
    avatarKey: 'perola',
    customImage: perolaPhoto,
    notes: 'Muito talentosa nos trabalhos de arte.',
    stickers: {
      'rayssa': true,
      'perola': true,
      'assiduo': true
    }
  },
  {
    id: 's_rhillary',
    name: 'Rhillary',
    avatarKey: 'rhillary',
    customImage: rhillaryPhoto,
    notes: 'Excelente cooperação em sala de aula.',
    stickers: {
      'vanda': true,
      'rhillary': true,
      'messi': true
    }
  },
  {
    id: 's_willyan',
    name: 'Willyan',
    avatarKey: 'willyan',
    customImage: willyanPhoto,
    notes: 'Sempre tira boas notas nas tarefas de matemática.',
    stickers: {
      'adriana': true,
      'willyan': true,
      'cr7': true
    }
  }
];

export const initialStudents: Student[] = customStudents && customStudents.length > 0
  ? customStudents
  : defaultStudents;

export const initialStickers: Sticker[] = customStickers && customStickers.length > 0
  ? customStickers
  : defaultStickers;

export const initialLastUpdated: number = customLastUpdated || 0;

