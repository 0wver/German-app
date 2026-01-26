import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial data structure for a new user
const initialUserData = {
  // User stats
  stats: {
    pointsEarned: 0,
    daysStreak: 0,
    totalTime: 0, // in minutes
    wordsLearned: 0,
    lessonsCompleted: 0,
    accuracy: 0,
  },
  
  // Learning activity for the last 7 days (one entry per day)
  activity: [0, 0, 0, 0, 0, 0, 0],
  
  // Progress for each category
  vocabularyProgress: {
    Greetings: 0,
    Food: 0,
    Travel: 0,
    Home: 0,
    Work: 0,
    Leisure: 0,
  },
  
  // Time spent distribution
  timeDistribution: {
    Grammar: 0,
    Vocabulary: 0,
    Phrases: 0,
    Practice: 0,
  },
  
  // Badges earned
  badges: [],
  
  // Daily goals
  goals: {
    daily: 50,
    current: 0,
  },
  
  // Course progress data
  courses: {
    beginner: [
      {
        id: 1,
        title: 'Introductions & Greetings',
        description: 'Learn basic German greetings and how to introduce yourself.',
        duration: 15,
        category: 'phrases',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say "Hello" in German?',
            options: ['Hallo', 'Bonjour', 'Ciao', 'Hola'],
            correctAnswer: 'Hallo'
          },
          {
            question: 'Which greeting is used in the morning?',
            options: ['Guten Tag', 'Guten Abend', 'Guten Morgen', 'Gute Nacht'],
            correctAnswer: 'Guten Morgen'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you formally ask "How are you?" in German?',
            options: ['Wie geht es dir?', 'Wie geht es Ihnen?', 'Wie heißen Sie?', 'Was machst du?'],
            correctAnswer: 'Wie geht es Ihnen?'
          },
          {
            question: 'Which is the correct way to say goodbye formally?',
            options: ['Tschüss', 'Auf Wiedersehen', 'Bis später', 'Ciao'],
            correctAnswer: 'Auf Wiedersehen'
          },
          {
            question: 'What does "Wie heißt du?" mean?',
            options: ['How are you?', 'Where are you from?', 'What is your name?', 'How old are you?'],
            correctAnswer: 'What is your name?'
          }
        ]
      },
      {
        id: 2,
        title: 'Present Tense: Regular Verbs',
        description: 'Learn to conjugate regular -er, -ir, and -re verbs in the present tense.',
        duration: 20,
        category: 'grammar',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'What is the correct conjugation of "spielen" (to play) with "ich"?',
            options: ['spiele', 'spielst', 'spielt', 'spielen'],
            correctAnswer: 'spiele'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you conjugate "machen" (to do/make) with "du"?',
            options: ['mache', 'machst', 'macht', 'machen'],
            correctAnswer: 'machst'
          },
          {
            question: 'What is the correct form of "lernen" (to learn) with "wir"?',
            options: ['lerne', 'lernst', 'lernt', 'lernen'],
            correctAnswer: 'lernen'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you conjugate "arbeiten" (to work) with "sie" (she)?',
            options: ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten'],
            correctAnswer: 'arbeitet'
          },
          {
            question: 'What is the correct form of "wohnen" (to live) with "ihr"?',
            options: ['wohne', 'wohnst', 'wohnt', 'wohnen'],
            correctAnswer: 'wohnt'
          }
        ]
      },
      {
        id: 3,
        title: 'Food & Dining',
        description: 'Learn vocabulary for food items and how to order in restaurants.',
        duration: 15,
        category: 'vocabulary',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'What is "das Brot" in English?',
            options: ['meat', 'bread', 'cheese', 'water'],
            correctAnswer: 'bread'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say "I would like to order" in German?',
            options: ['Ich möchte zahlen', 'Ich möchte bestellen', 'Ich möchte essen', 'Ich möchte trinken'],
            correctAnswer: 'Ich möchte bestellen'
          },
          {
            question: 'What is "der Käse" in English?',
            options: ['cheese', 'cake', 'coffee', 'chicken'],
            correctAnswer: 'cheese'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you ask for the bill in German?',
            options: ['Das Menü, bitte', 'Die Rechnung, bitte', 'Das Wasser, bitte', 'Die Speisekarte, bitte'],
            correctAnswer: 'Die Rechnung, bitte'
          },
          {
            question: 'What does "das Gemüse" mean?',
            options: ['meat', 'fruit', 'vegetables', 'dessert'],
            correctAnswer: 'vegetables'
          }
        ]
      },
      {
        id: 4,
        title: 'Numbers & Counting',
        description: 'Learn how to count in German and use numbers in conversation.',
        duration: 10,
        category: 'vocabulary',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'What is the German word for the number 7?',
            options: ['sechs', 'sieben', 'acht', 'neun'],
            correctAnswer: 'sieben'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say 15 in German?',
            options: ['fünfzehn', 'fünfzig', 'fünf', 'sechzehn'],
            correctAnswer: 'fünfzehn'
          },
          {
            question: 'What is the correct German word for 20?',
            options: ['zwanzig', 'zweiundzwanzig', 'zwölf', 'zwei'],
            correctAnswer: 'zwanzig'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say 42 in German?',
            options: ['vierzig', 'zweiundvierzig', 'vierundzwanzig', 'zweiundzwanzig'],
            correctAnswer: 'zweiundvierzig'
          },
          {
            question: 'What is the German word for 100?',
            options: ['tausend', 'zehn', 'hundert', 'einhundert'],
            correctAnswer: 'hundert'
          }
        ]
      },
      {
        id: 5,
        title: 'Basic Questions',
        description: 'Learn how to ask questions in German using proper word order and question words.',
        duration: 15,
        category: 'grammar',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'What is the German word for "where"?',
            options: ['wann', 'wo', 'warum', 'wer'],
            correctAnswer: 'wo'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you ask "What is that?" in German?',
            options: ['Was ist das?', 'Wo ist das?', 'Wer ist das?', 'Wie ist das?'],
            correctAnswer: 'Was ist das?'
          },
          {
            question: 'What is the correct word order for "Do you speak English?"',
            options: ['Sprichst du Englisch?', 'Du sprichst Englisch?', 'Englisch du sprichst?', 'Sprichst Englisch du?'],
            correctAnswer: 'Sprichst du Englisch?'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you ask "When does the train arrive?" in German?',
            options: ['Wann kommt der Zug an?', 'Wo kommt der Zug an?', 'Wie kommt der Zug an?', 'Warum kommt der Zug an?'],
            correctAnswer: 'Wann kommt der Zug an?'
          },
          {
            question: 'What is the German word for "why"?',
            options: ['wann', 'wo', 'warum', 'wie'],
            correctAnswer: 'warum'
          }
        ]
      },
      {
        id: 23,
        title: 'Adjectives',
        description: 'Learn common German adjectives and how to use them in sentences.',
        duration: 18,
        category: 'grammar',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'What is the German word for "good"?',
            options: ['schlecht', 'gut', 'böse', 'klein'],
            correctAnswer: 'gut'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say "The weather is beautiful" in German?',
            options: ['Das Wetter ist schlecht', 'Das Wetter ist gut', 'Das Wetter ist hässlich', 'Das Wetter ist schön'],
            correctAnswer: 'Das Wetter ist schön'
          },
          {
            question: 'What is the German word for "expensive"?',
            options: ['billig', 'teuer', 'günstig', 'kostenlos'],
            correctAnswer: 'teuer'
          },
          {
            question: 'Which adjective means "small" in German?',
            options: ['groß', 'klein', 'lang', 'kurz'],
            correctAnswer: 'klein'
          },
          {
            question: 'What is the correct form of "alt" in "Die alte Frau"?',
            options: ['alt', 'alte', 'alten', 'alter'],
            correctAnswer: 'alte'
          },
          {
            question: 'What is the German word for "beautiful"?',
            options: ['hässlich', 'schön', 'gut', 'schlecht'],
            correctAnswer: 'schön'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say "The car is fast" in German?',
            options: ['Das Auto ist langsam', 'Das Auto ist schnell', 'Das Auto ist groß', 'Das Auto ist klein'],
            correctAnswer: 'Das Auto ist schnell'
          },
          {
            question: 'What is the correct form of "groß" in "Der große Mann"?',
            options: ['groß', 'große', 'großen', 'großer'],
            correctAnswer: 'große'
          },
          {
            question: 'Which adjective means "new" in German?',
            options: ['alt', 'jung', 'neu', 'modern'],
            correctAnswer: 'neu'
          },
          {
            question: 'What is the German word for "difficult"?',
            options: ['einfach', 'schwierig', 'leicht', 'hart'],
            correctAnswer: 'schwierig'
          }
        ]
      },
      {
        id: 24,
        title: 'Prepositions',
        description: 'Learn basic German prepositions and how to use them correctly.',
        duration: 20,
        category: 'grammar',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'What preposition is used to indicate location "in"?',
            options: ['auf', 'in', 'unter', 'neben'],
            correctAnswer: 'in'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say "The book is on the table" in German?',
            options: ['Das Buch ist in dem Tisch', 'Das Buch ist auf dem Tisch', 'Das Buch ist unter dem Tisch', 'Das Buch ist neben dem Tisch'],
            correctAnswer: 'Das Buch ist auf dem Tisch'
          },
          {
            question: 'Which preposition means "with"?',
            options: ['ohne', 'mit', 'gegen', 'für'],
            correctAnswer: 'mit'
          },
          {
            question: 'Which preposition means "without"?',
            options: ['ohne', 'mit', 'gegen', 'für'],
            correctAnswer: 'ohne'
          },
          {
            question: 'What preposition is used in "Ich gehe zum Supermarkt"?',
            options: ['zu', 'in', 'an', 'bei'],
            correctAnswer: 'zu'
          },
          {
            question: 'Which preposition means "for"?',
            options: ['mit', 'für', 'gegen', 'nach'],
            correctAnswer: 'für'
          },
          {
            question: 'What preposition is used in "Das Bild hängt an der Wand"?',
            options: ['an', 'auf', 'über', 'neben'],
            correctAnswer: 'an'
          },
          {
            question: 'Which preposition means "under"?',
            options: ['über', 'unter', 'neben', 'zwischen'],
            correctAnswer: 'unter'
          },
          {
            question: 'What preposition is used in "Ich fahre nach Berlin"?',
            options: ['zu', 'nach', 'in', 'bei'],
            correctAnswer: 'nach'
          },
          {
            question: 'Which preposition means "between"?',
            options: ['neben', 'zwischen', 'hinter', 'vor'],
            correctAnswer: 'zwischen'
          }
        ]
      },
      {
        id: 25,
        title: 'Irregular Verbs',
        description: 'Learn common irregular verbs in German and their conjugations.',
        duration: 22,
        category: 'grammar',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'What is the past participle of "sein" (to be)?',
            options: ['ist', 'war', 'gewesen', 'hat'],
            correctAnswer: 'gewesen'
          },
          {
            question: 'What is the correct form of "haben" (to have) in the present tense for "ich"?',
            options: ['habe', 'hast', 'hat', 'haben'],
            correctAnswer: 'habe'
          },
          {
            question: 'What is the past tense (Präteritum) of "gehen"?',
            options: ['geht', 'ging', 'gegangen', 'gehte'],
            correctAnswer: 'ging'
          },
          {
            question: 'What is the correct conjugation of "fahren" for "du"?',
            options: ['fahre', 'fährst', 'fährt', 'fahren'],
            correctAnswer: 'fährst'
          },
          {
            question: 'What is the past participle of "trinken"?',
            options: ['trinkt', 'trank', 'getrunken', 'getrinkt'],
            correctAnswer: 'getrunken'
          },
          {
            question: 'What is the past tense (Präteritum) of "sein"?',
            options: ['ist', 'war', 'gewesen', 'seid'],
            correctAnswer: 'war'
          },
          {
            question: 'What is the correct conjugation of "essen" for "er"?',
            options: ['esst', 'isst', 'esse', 'essen'],
            correctAnswer: 'isst'
          },
          {
            question: 'What is the past participle of "sprechen"?',
            options: ['spricht', 'sprach', 'gesprochen', 'gesprechen'],
            correctAnswer: 'gesprochen'
          },
          {
            question: 'What is the correct form of "werden" in the present tense for "wir"?',
            options: ['werde', 'wirst', 'wird', 'werden'],
            correctAnswer: 'werden'
          },
          {
            question: 'What is the past tense (Präteritum) of "kommen"?',
            options: ['kommt', 'kam', 'gekommen', 'kommte'],
            correctAnswer: 'kam'
          }
        ]
      },
      {
        id: 26,
        title: 'Accusative Case',
        description: 'Learn how to use the accusative case in German sentences.',
        duration: 19,
        category: 'grammar',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'Which article is used for masculine nouns in the accusative case?',
            options: ['der', 'den', 'dem', 'des'],
            correctAnswer: 'den'
          },
          {
            question: 'What happens to the direct object in an accusative sentence?',
            options: ['It changes gender', 'It changes case', 'It stays the same', 'It disappears'],
            correctAnswer: 'It changes case'
          },
          {
            question: 'Which preposition always takes the accusative case?',
            options: ['mit', 'für', 'bei', 'aus'],
            correctAnswer: 'für'
          },
          {
            question: 'What is the accusative form of "eine Frau"?',
            options: ['eine Frau', 'einer Frau', 'einen Frau', 'ein Frau'],
            correctAnswer: 'eine Frau'
          },
          {
            question: 'In the sentence "Ich sehe das Kind", which word is in the accusative case?',
            options: ['Ich', 'sehe', 'das', 'Kind'],
            correctAnswer: 'Kind'
          },
          {
            question: 'What is the accusative form of "der Mann"?',
            options: ['der Mann', 'den Mann', 'dem Mann', 'des Mannes'],
            correctAnswer: 'den Mann'
          },
          {
            question: 'Which verb always requires an accusative object?',
            options: ['helfen', 'danken', 'sehen', 'folgen'],
            correctAnswer: 'sehen'
          },
          {
            question: 'What is the accusative form of "das Buch"?',
            options: ['der Buch', 'den Buch', 'dem Buch', 'das Buch'],
            correctAnswer: 'das Buch'
          },
          {
            question: 'Which preposition can take either accusative or dative depending on context?',
            options: ['für', 'ohne', 'in', 'gegen'],
            correctAnswer: 'in'
          },
          {
            question: 'In the sentence "Er kauft einen Apfel", what case is "einen Apfel" in?',
            options: ['Nominative', 'Accusative', 'Dative', 'Genitive'],
            correctAnswer: 'Accusative'
          }
        ]
      }
    ],
    intermediate: [
      {
        id: 101,
        title: 'Past Tense: Perfekt',
        description: 'Learn how to form and use the perfect tense in German.',
        duration: 25,
        category: 'grammar',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'Which auxiliary verb is used with movement verbs in Perfekt?',
            options: ['haben', 'sein', 'werden', 'können'],
            correctAnswer: 'sein'
          },
          {
            question: 'What is the past participle of "gehen"?',
            options: ['gegangen', 'gegehen', 'gegeht', 'gehte'],
            correctAnswer: 'gegangen'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say "I have eaten" in German?',
            options: ['Ich habe gegessen', 'Ich bin gegessen', 'Ich habe essen', 'Ich hatte gegessen'],
            correctAnswer: 'Ich habe gegessen'
          },
          {
            question: 'Which sentence is correctly formed in the Perfekt tense?',
            options: ['Er hat geschwimmt', 'Er hat geschwommen', 'Er ist geschwimmt', 'Er ist geschwommen'],
            correctAnswer: 'Er ist geschwommen'
          },
          {
            question: 'What is the past participle of "trinken"?',
            options: ['getrunken', 'getrinkt', 'getranken', 'trunkt'],
            correctAnswer: 'getrunken'
          },
          {
            question: 'Which verb uses "haben" as its auxiliary in Perfekt?',
            options: ['fahren', 'gehen', 'laufen', 'spielen'],
            correctAnswer: 'spielen'
          },
          {
            question: 'What is the past participle of "lesen"?',
            options: ['gelesen', 'gelest', 'geliest', 'las'],
            correctAnswer: 'gelesen'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say "She has come" in German?',
            options: ['Sie hat gekommen', 'Sie ist gekommen', 'Sie hat kommen', 'Sie ist kommen'],
            correctAnswer: 'Sie ist gekommen'
          },
          {
            question: 'What is the past participle of "schreiben"?',
            options: ['geschrieben', 'geschriebt', 'geschreibt', 'schrieb'],
            correctAnswer: 'geschrieben'
          },
          {
            question: 'Which sentence is in the Perfekt tense?',
            options: ['Ich gehe nach Hause', 'Ich ging nach Hause', 'Ich bin nach Hause gegangen', 'Ich werde nach Hause gehen'],
            correctAnswer: 'Ich bin nach Hause gegangen'
          }
        ]
      },
      {
        id: 102,
        title: 'Dative Case',
        description: 'Master the dative case and its applications in German sentences.',
        duration: 22,
        category: 'grammar',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'Which article is used for masculine nouns in the dative case?',
            options: ['der', 'den', 'dem', 'des'],
            correctAnswer: 'dem'
          },
          {
            question: 'Which preposition always takes the dative case?',
            options: ['für', 'gegen', 'mit', 'durch'],
            correctAnswer: 'mit'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say "to the woman" in German using dative?',
            options: ['die Frau', 'der Frau', 'den Frauen', 'dem Frau'],
            correctAnswer: 'der Frau'
          },
          {
            question: 'Which verb always requires the dative case?',
            options: ['sehen', 'helfen', 'lieben', 'finden'],
            correctAnswer: 'helfen'
          },
          {
            question: 'What is the dative form of "das Kind" (the child)?',
            options: ['das Kind', 'dem Kind', 'den Kind', 'des Kindes'],
            correctAnswer: 'dem Kind'
          },
          {
            question: 'What is the dative form of "die Bücher" (the books)?',
            options: ['die Bücher', 'der Bücher', 'den Büchern', 'dem Bücher'],
            correctAnswer: 'den Büchern'
          },
          {
            question: 'Which preposition can take either dative or accusative depending on context?',
            options: ['mit', 'zu', 'auf', 'bei'],
            correctAnswer: 'auf'
          },
          {
            question: 'In the sentence "Ich gebe dem Mann das Buch", which word is in the dative case?',
            options: ['Ich', 'gebe', 'dem Mann', 'das Buch'],
            correctAnswer: 'dem Mann'
          },
          {
            question: 'What is the dative form of "ein Freund" (a friend)?',
            options: ['ein Freund', 'einen Freund', 'einem Freund', 'eines Freundes'],
            correctAnswer: 'einem Freund'
          },
          {
            question: 'Which verb requires an indirect object in the dative case?',
            options: ['kaufen', 'sehen', 'geben', 'finden'],
            correctAnswer: 'geben'
          }
        ]
      },
      {
        id: 103,
        title: 'Modal Verbs',
        description: 'Learn to use German modal verbs to express ability, permission, and obligation.',
        duration: 20,
        category: 'grammar',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'Which modal verb expresses ability in German?',
            options: ['müssen', 'sollen', 'können', 'dürfen'],
            correctAnswer: 'können'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say "I must go" in German?',
            options: ['Ich kann gehen', 'Ich muss gehen', 'Ich will gehen', 'Ich soll gehen'],
            correctAnswer: 'Ich muss gehen'
          },
          {
            question: 'Which modal verb expresses permission?',
            options: ['können', 'müssen', 'dürfen', 'wollen'],
            correctAnswer: 'dürfen'
          },
          {
            question: 'What is the correct conjugation of "wollen" with "wir"?',
            options: ['wollen', 'wollt', 'will', 'willst'],
            correctAnswer: 'wollen'
          },
          {
            question: 'Which sentence uses a modal verb correctly?',
            options: ['Er muss nach Hause gehen', 'Er muss nach Hause zu gehen', 'Er muss gehen nach Hause', 'Er muss geht nach Hause'],
            correctAnswer: 'Er muss nach Hause gehen'
          },
          {
            question: 'What is the correct conjugation of "können" with "du"?',
            options: ['kannst', 'kann', 'können', 'könnt'],
            correctAnswer: 'kannst'
          },
          {
            question: 'Which modal verb expresses desire or wanting?',
            options: ['müssen', 'sollen', 'dürfen', 'wollen'],
            correctAnswer: 'wollen'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say "You should study" in German?',
            options: ['Du musst lernen', 'Du kannst lernen', 'Du sollst lernen', 'Du willst lernen'],
            correctAnswer: 'Du sollst lernen'
          },
          {
            question: 'What is the correct position of the main verb when using a modal verb?',
            options: ['First position', 'Second position', 'Last position', 'Third position'],
            correctAnswer: 'Last position'
          },
          {
            question: 'What is the past tense of "können"?',
            options: ['konnte', 'könnte', 'gekonnt', 'kann'],
            correctAnswer: 'konnte'
          }
        ]
      },
      {
        id: 104,
        title: 'Business German',
        description: 'Learn essential vocabulary and phrases for professional settings.',
        duration: 18,
        category: 'vocabulary',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'What is "eine Besprechung" in English?',
            options: ['a business', 'a meeting', 'a contract', 'a colleague'],
            correctAnswer: 'a meeting'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          }
        ]
      },
      {
        id: 105,
        title: 'Travel & Transportation',
        description: 'Learn vocabulary and phrases for navigating transportation in German-speaking countries.',
        duration: 15,
        category: 'phrases',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you ask "Where is the train station?" in German?',
            options: ['Wo ist der Flughafen?', 'Wo ist der Bahnhof?', 'Wo ist die U-Bahn?', 'Wo ist die Haltestelle?'],
            correctAnswer: 'Wo ist der Bahnhof?'
          },
          {
            question: 'What is "eine Fahrkarte" in English?',
            options: ['a car', 'a ticket', 'a timetable', 'a delay'],
            correctAnswer: 'a ticket'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say "I would like to rent a car" in German?',
            options: ['Ich möchte ein Auto mieten', 'Ich möchte ein Auto kaufen', 'Ich möchte mit dem Auto fahren', 'Ich möchte ein Taxi nehmen'],
            correctAnswer: 'Ich möchte ein Auto mieten'
          },
          {
            question: 'What does "umsteigen" mean?',
            options: ['to get on', 'to get off', 'to transfer', 'to drive'],
            correctAnswer: 'to transfer'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How would you ask "When does the bus leave?" in German?',
            options: ['Wann kommt der Bus an?', 'Wann fährt der Bus ab?', 'Wo hält der Bus?', 'Wie lange dauert die Fahrt?'],
            correctAnswer: 'Wann fährt der Bus ab?'
          }
        ]
      }
    ],
    advanced: [
      {
        id: 201,
        title: 'Subjunctive Mood',
        description: 'Master the subjunctive mood (Konjunktiv) for expressing hypothetical situations.',
        duration: 30,
        category: 'grammar',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'Which form of the subjunctive is used for polite requests?',
            options: ['Konjunktiv I', 'Konjunktiv II', 'Indikativ', 'Imperativ'],
            correctAnswer: 'Konjunktiv II'
          },
          {
            question: 'What is the Konjunktiv II form of "haben"?',
            options: ['habe', 'hätte', 'hatte', 'hat'],
            correctAnswer: 'hätte'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you say "I would do it" in German?',
            options: ['Ich mache es', 'Ich machte es', 'Ich würde es machen', 'Ich werde es machen'],
            correctAnswer: 'Ich würde es machen'
          },
          {
            question: 'Which sentence correctly uses Konjunktiv II?',
            options: ['Wenn ich Zeit habe, komme ich', 'Wenn ich Zeit hätte, käme ich', 'Wenn ich Zeit hatte, kam ich', 'Wenn ich Zeit haben werde, komme ich'],
            correctAnswer: 'Wenn ich Zeit hätte, käme ich'
          },
          {
            question: 'What is the Konjunktiv II form of "sein"?',
            options: ['sei', 'ist', 'war', 'wäre'],
            correctAnswer: 'wäre'
          }
        ]
      },
      {
        id: 202,
        title: 'Advanced Passive Voice',
        description: 'Learn to use and understand complex passive constructions in German.',
        duration: 25,
        category: 'grammar',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How is the passive voice formed in German?',
            options: ['werden + past participle', 'haben + past participle', 'sein + past participle', 'werden + infinitive'],
            correctAnswer: 'werden + past participle'
          },
          {
            question: 'Which sentence is in the passive voice?',
            options: ['Er schreibt einen Brief', 'Der Brief wird geschrieben', 'Er hat einen Brief geschrieben', 'Er will einen Brief schreiben'],
            correctAnswer: 'Der Brief wird geschrieben'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you form the passive voice in the past tense?',
            options: ['wurde + past participle', 'hat + past participle', 'ist + past participle', 'werden + past participle'],
            correctAnswer: 'wurde + past participle'
          },
          {
            question: 'What is the passive form of "Man isst den Kuchen"?',
            options: ['Der Kuchen wird gegessen', 'Der Kuchen isst man', 'Man wird den Kuchen essen', 'Der Kuchen ist gegessen'],
            correctAnswer: 'Der Kuchen wird gegessen'
          },
          {
            question: 'Which sentence uses the passive voice with a modal verb?',
            options: ['Das muss gemacht werden', 'Das wird gemacht', 'Das ist gemacht worden', 'Das hat gemacht werden müssen'],
            correctAnswer: 'Das muss gemacht werden'
          }
        ]
      },
      {
        id: 203,
        title: 'German Literature & Culture',
        description: 'Explore famous German authors, literary works, and cultural concepts.',
        duration: 22,
        category: 'culture',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'Who wrote "Faust"?',
            options: ['Friedrich Schiller', 'Johann Wolfgang von Goethe', 'Thomas Mann', 'Hermann Hesse'],
            correctAnswer: 'Johann Wolfgang von Goethe'
          },
          {
            question: 'What is "Heimat"?',
            options: ['A type of German food', 'A concept of homeland or belonging', 'A traditional festival', 'A famous museum'],
            correctAnswer: 'A concept of homeland or belonging'
          },
          {
            question: 'Which of these is a famous German fairy tale collection?',
            options: ['Buddenbrooks', 'Kinder- und Hausmärchen', 'Die Verwandlung', 'Der Prozess'],
            correctAnswer: 'Kinder- und Hausmärchen'
          },
          {
            question: 'What cultural movement did Friedrich Schiller belong to?',
            options: ['Expressionism', 'Romanticism', 'Sturm und Drang', 'Bauhaus'],
            correctAnswer: 'Sturm und Drang'
          },
          {
            question: 'What is "Die Berliner Mauer"?',
            options: ['A famous painting', 'The Berlin Wall', 'A German novel', 'A type of architecture'],
            correctAnswer: 'The Berlin Wall'
          }
        ]
      },
      {
        id: 204,
        title: 'Business Negotiations',
        description: 'Learn advanced vocabulary and phrases for business negotiations in German.',
        duration: 28,
        category: 'phrases',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How would you say "We need to discuss the terms of the contract" in German?',
            options: ['Wir müssen die Vertragsbedingungen besprechen', 'Wir müssen über den Vertrag sprechen', 'Wir brauchen einen Vertrag', 'Wir wollen einen Vertrag machen'],
            correctAnswer: 'Wir müssen die Vertragsbedingungen besprechen'
          },
          {
            question: 'What does "Verhandlungssache" mean?',
            options: ['Contract', 'Negotiable', 'Business deal', 'Partnership'],
            correctAnswer: 'Negotiable'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How do you politely disagree in a business context?',
            options: ['Das stimmt nicht', 'Ich bin anderer Meinung', 'Sie haben Unrecht', 'Das ist falsch'],
            correctAnswer: 'Ich bin anderer Meinung'
          },
          {
            question: 'What is "eine Gewinnspanne" in English?',
            options: ['A business goal', 'A profit margin', 'A sales target', 'A market share'],
            correctAnswer: 'A profit margin'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How would you suggest a compromise in German?',
            options: ['Wir müssen uns einigen', 'Ich schlage einen Kompromiss vor', 'Wir sollten nachgeben', 'Sie müssen zustimmen'],
            correctAnswer: 'Ich schlage einen Kompromiss vor'
          }
        ]
      },
      {
        id: 205,
        title: 'Academic German',
        description: 'Master vocabulary and structures needed for academic writing and presentations.',
        duration: 26,
        category: 'vocabulary',
        progress: 0,
        completed: false,
        locked: false,
        questions: [
          {
            question: 'What is "eine Abhandlung" in English?',
            options: ['A thesis', 'A treatise', 'A quote', 'A reference'],
            correctAnswer: 'A treatise'
          },
          {
            question: 'How do you say "I have a business meeting" in German?',
            options: ['Ich habe ein Geschäftstreffen', 'Ich habe eine Besprechung', 'Ich habe ein Meeting', 'Ich habe eine Konferenz'],
            correctAnswer: 'Ich habe ein Geschäftstreffen'
          },
          {
            question: 'How would you say "according to the research" in academic German?',
            options: ['nach der Forschung', 'laut der Forschung', 'mit der Forschung', 'für die Forschung'],
            correctAnswer: 'laut der Forschung'
          },
          {
            question: 'What does "erörtern" mean in academic context?',
            options: ['to explain', 'to discuss', 'to prove', 'to cite'],
            correctAnswer: 'to discuss'
          },
          {
            question: 'Which phrase would you use to introduce a conclusion in an academic paper?',
            options: ['Zum Schluss', 'Endlich', 'Am Ende', 'Zuletzt'],
            correctAnswer: 'Zum Schluss'
          },
          {
            question: 'What is "ein Zitat" in English?',
            options: ['A citation', 'A quotation', 'A reference', 'A footnote'],
            correctAnswer: 'A quotation'
          }
        ]
      }
    ]
  },
  // User profile information
  profile: {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    memberSince: 'May 2023',
    level: 'Beginner',
  },
};

// Create the context
const UserDataContext = createContext();

// Create provider component
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedData = localStorage.getItem('germanAppUserData');
    if (storedData) {
      try {
        setUserData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        setUserData(initialUserData);
      }
    } else {
      setUserData(initialUserData);
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      const save = () => {
        localStorage.setItem('germanAppUserData', JSON.stringify(userData));
      };

      const handler = setTimeout(save, 1000);

      const handleBeforeUnload = () => {
        save();
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        clearTimeout(handler);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [userData, isLoaded]);

  // Update user progress
  const updateProgress = (courseType, lessonId, progressValue) => {
    setUserData(prevData => {
      const updatedCourses = JSON.parse(JSON.stringify(prevData.courses));
      const lesson = updatedCourses[courseType].find(l => l.id === lessonId);
      if (lesson) {
        const wasCompleted = lesson.completed;
        lesson.progress = progressValue;
        if (progressValue === 100) {
          lesson.completed = true;
          const currentIndex = updatedCourses[courseType].findIndex(l => l.id === lessonId);
          if (currentIndex !== -1 && currentIndex + 1 < updatedCourses[courseType].length) {
            updatedCourses[courseType][currentIndex + 1].locked = false;
          }
        }
        const stats = { ...prevData.stats };
        if (progressValue === 100 && !wasCompleted) {
          stats.lessonsCompleted += 1;
        }
        const goals = { ...prevData.goals };
        goals.current = Math.min(goals.daily, goals.current + 5);
        return {
          ...prevData,
          courses: updatedCourses,
          stats,
          goals,
        };
      }
      return prevData;
    });
  };

  // Update general user stats
  const updateStats = (statUpdates) => {
    setUserData(prevData => ({
      ...prevData,
      stats: {
        ...prevData.stats,
        ...statUpdates
      }
    }));
  };

  // Update activity for today
  const updateTodayActivity = (points) => {
    setUserData(prevData => {
      const updatedActivity = [...prevData.activity];
      updatedActivity[updatedActivity.length - 1] += points;
      return {
        ...prevData,
        activity: updatedActivity
      };
    });
  };

  // Update vocabulary progress
  const updateVocabularyProgress = (category, progressValue) => {
    setUserData(prevData => ({
      ...prevData,
      vocabularyProgress: {
        ...prevData.vocabularyProgress,
        [category]: progressValue
      }
        }));
      };
    
      // Update time distribution
      const updateTimeDistribution = (category, minutes) => {
        if (minutes <= 0) return;
        setUserData(prevData => ({
          ...prevData,
          timeDistribution: {
            ...prevData.timeDistribution,
            [category]: prevData.timeDistribution[category] + minutes
          },
          stats: {
            ...prevData.stats,
            totalTime: prevData.stats.totalTime + minutes
          }
        }));
      };
    
      // Update accuracy stats
      const updateAccuracy = (newAccuracy) => {
        setUserData(prevData => {
          let updatedAccuracy = newAccuracy;
          if (prevData.stats.lessonsCompleted > 0) {
            updatedAccuracy = Math.round(
              (prevData.stats.accuracy * prevData.stats.lessonsCompleted + newAccuracy) / 
              (prevData.stats.lessonsCompleted + 1)
            );
          }
          return {
            ...prevData,
            stats: {
              ...prevData.stats,
              accuracy: updatedAccuracy
            }
          };
        });
      };
    
      // Reset user data to initial state
      const resetUserData = () => {
        setUserData(initialUserData);
        localStorage.setItem('germanAppUserData', JSON.stringify(initialUserData));
      };
    
      // Check daily streak and update
      const checkAndUpdateStreak = () => {
        setUserData(prevData => ({
          ...prevData,
          stats: {
            ...prevData.stats,
            daysStreak: prevData.stats.daysStreak + 1
          }
        }));
      };
    
      return (
        <UserDataContext.Provider value={{ 
          userData,
          updateProgress,
          updateStats,
          updateTodayActivity,
          updateVocabularyProgress,
          updateTimeDistribution,
          updateAccuracy,
          resetUserData,
          checkAndUpdateStreak
        }}>
          {children}
        </UserDataContext.Provider>
      );
    };
    
    // Custom hook to use the context
    export const useUserData = () => {
      const context = useContext(UserDataContext);
      if (!context) {
        throw new Error('useUserData must be used within a UserDataProvider');
      }
      return context;
    };
    
    export default UserDataContext;
