import { Serie } from '../../shared/models';

export const SeriesMock: Serie[] = [
  {
    score: 0.70492816,
    show: {
      id: 169,
      name: 'Breaking Bad',
      rating: { average: 9.3 },
      status: 'Ended',
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/501/1253519.jpg',
        original:
          'https://static.tvmaze.com/uploads/images/original_untouched/501/1253519.jpg',
      },
      summary:
        "<p><b>Breaking Bad</b> follows protagonist Walter White, a chemistry teacher who lives in New Mexico with his wife and teenage son who has cerebral palsy. White is diagnosed with Stage III cancer and given a prognosis of two years left to live. With a new sense of fearlessness based on his medical prognosis, and a desire to secure his family's financial security, White chooses to enter a dangerous world of drugs and crime and ascends to power in this world. The series explores how a fatal diagnosis such as White's releases a typical man from the daily concerns and constraints of normal society and follows his transformation from mild family man to a kingpin of the drug trade.</p>",
    },
  },
];
