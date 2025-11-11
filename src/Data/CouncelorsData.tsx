import doc1 from "../assets/Councelors/doc 1.png";
import doc2 from "../assets/Councelors/doc 2.jpg";
import doc3 from "../assets/Councelors/doc 3.jpg";
import doc4 from "../assets/Councelors/doc 4.png";
import doc5 from "../assets/Councelors/doc 5.png";
import doc6 from "../assets/Councelors/doc 6.png";
import doc7 from "../assets/Councelors/doc 7.jpg";
import doc8 from "../assets/Councelors/doc 8.jpg";
import doc9 from "../assets/Councelors/doc 9.png";
import doc10 from "../assets/Councelors/doc 10.png";
import doc11 from "../assets/Councelors/doc 11.jpg";
import doc12 from "../assets/Councelors/doc 12.png";
import doc13 from "../assets/Councelors/doc 13.png";
import doc14 from "../assets/Councelors/doc 14.png";
import doc15 from "../assets/Councelors/doc 15.png";

export interface Counselor {
  id: number;
  name: string;
  degree: string;
  specialization: string;
  image: string;
  availableDate: string;
  availableTime: string;
  category: string;
  experience?: string;
  about?: string;
}

const CouncelorsData: Counselor[] = [
  {
    id: 1,
    name: "Dr. Ananya Sen",
    degree: "PhD, Clinical Psychology",
    specialization: "Clinical Psychologist",
    image: doc1,
    availableDate: "2025-11-05",
    availableTime: "11:00 AM",
    category: "Clinical",
    experience: "10+ years",
    about:
      "Dr. Ananya specializes in cognitive behavioral therapy and trauma recovery, offering personalized treatment for emotional wellness.",
  },
  {
    id: 2,
    name: "Ms. Arpita Roy",
    degree: "M.A. Counseling",
    specialization: "Counseling Psychologist",
    image: doc2,
    availableDate: "2025-11-07",
    availableTime: "4:30 PM",
    category: "Counseling",
    experience: "6 years",
    about:
      "Arpita focuses on relationship counseling and stress management. Her sessions combine empathy with practical healing strategies.",
  },
  {
    id: 3,
    name: "Mr. Arjun Das",
    degree: "M.A. Child Psychology",
    specialization: "Child & Adolescent Therapist",
    image: doc3,
    availableDate: "2025-11-05",
    availableTime: "10:00 AM",
    category: "Child",
    experience: "8 years",
    about:
      "Arjun works closely with children and teenagers, creating a nurturing environment for emotional and behavioral growth.",
  },
  {
    id: 4,
    name: "Dr. Neha Kapoor",
    degree: "PhD, Marriage & Family Therapy",
    specialization: "Family Counselor",
    image: doc4,
    availableDate: "2025-11-06",
    availableTime: "2:00 PM",
    category: "Family",
    experience: "12 years",
    about:
      "Dr. Neha helps families navigate communication barriers and emotional challenges with warmth and clarity.",
  },
  {
    id: 5,
    name: "Mr. Rajesh Nair",
    degree: "M.A. Clinical Psychology",
    specialization: "Anxiety & Depression Specialist",
    image: doc5,
    availableDate: "2025-11-08",
    availableTime: "1:00 PM",
    category: "Anxiety",
    experience: "9 years",
    about:
      "Rajesh uses mindfulness and evidence-based methods to help clients overcome anxiety, stress, and burnout.",
  },
    {
    id: 6,
    name: "Mr. Rajesh Nair",
    degree: "M.A. Clinical Psychology",
    specialization: "Anxiety & Depression Specialist",
    image: doc6,
    availableDate: "2025-11-08",
    availableTime: "1:00 PM",
    category: "Anxiety",
    experience: "9 years",
    about:
      "Rajesh uses mindfulness and evidence-based methods to help clients overcome anxiety, stress, and burnout.",
  },
    {
    id: 7,
    name: "Mr. Rajesh Nair",
    degree: "M.A. Clinical Psychology",
    specialization: "Anxiety & Depression Specialist",
    image: doc7,
    availableDate: "2025-11-08",
    availableTime: "1:00 PM",
    category: "Anxiety",
    experience: "9 years",
    about:
      "Rajesh uses mindfulness and evidence-based methods to help clients overcome anxiety, stress, and burnout.",
  },
    {
    id: 8,
    name: "Mr. Rajesh Nair",
    degree: "M.A. Clinical Psychology",
    specialization: "Anxiety & Depression Specialist",
    image: doc8,
    availableDate: "2025-11-08",
    availableTime: "1:00 PM",
    category: "Anxiety",
    experience: "9 years",
    about:
      "Rajesh uses mindfulness and evidence-based methods to help clients overcome anxiety, stress, and burnout.",
  },
    {
    id: 9,
    name: "Mr. Rajesh Nair",
    degree: "M.A. Clinical Psychology",
    specialization: "Anxiety & Depression Specialist",
    image: doc9,
    availableDate: "2025-11-08",
    availableTime: "1:00 PM",
    category: "Anxiety",
    experience: "9 years",
    about:
      "Rajesh uses mindfulness and evidence-based methods to help clients overcome anxiety, stress, and burnout.",
  },
    {
    id: 10,
    name: "Mr. Rajesh Nair",
    degree: "M.A. Clinical Psychology",
    specialization: "Anxiety & Depression Specialist",
    image: doc10,
    availableDate: "2025-11-08",
    availableTime: "1:00 PM",
    category: "Anxiety",
    experience: "9 years",
    about:
      "Rajesh uses mindfulness and evidence-based methods to help clients overcome anxiety, stress, and burnout.",
  },
    {
    id: 11,
    name: "Mr. Rajesh Nair",
    degree: "M.A. Clinical Psychology",
    specialization: "Anxiety & Depression Specialist",
    image: doc11,
    availableDate: "2025-11-08",
    availableTime: "1:00 PM",
    category: "Anxiety",
    experience: "9 years",
    about:
      "Rajesh uses mindfulness and evidence-based methods to help clients overcome anxiety, stress, and burnout.",
  },
    {
    id: 12,
    name: "Mr. Rajesh Nair",
    degree: "M.A. Clinical Psychology",
    specialization: "Anxiety & Depression Specialist",
    image: doc12,
    availableDate: "2025-11-08",
    availableTime: "1:00 PM",
    category: "Anxiety",
    experience: "9 years",
    about:
      "Rajesh uses mindfulness and evidence-based methods to help clients overcome anxiety, stress, and burnout.",
  },
     {
    id: 13,
    name: "Mr. Rajesh Nair",
    degree: "M.A. Clinical Psychology",
    specialization: "Anxiety & Depression Specialist",
    image: doc13,
    availableDate: "2025-11-08",
    availableTime: "1:00 PM",
    category: "Anxiety",
    experience: "9 years",
    about:
      "Rajesh uses mindfulness and evidence-based methods to help clients overcome anxiety, stress, and burnout.",
  },
     {
    id: 14,
    name: "Mr. Rajesh Nair",
    degree: "M.A. Clinical Psychology",
    specialization: "Anxiety & Depression Specialist",
    image: doc14,
    availableDate: "2025-11-08",
    availableTime: "1:00 PM",
    category: "Anxiety",
    experience: "9 years",
    about:
      "Rajesh uses mindfulness and evidence-based methods to help clients overcome anxiety, stress, and burnout.",
  },
     {
    id: 15,
    name: "Mr. Rajesh Nair",
    degree: "M.A. Clinical Psychology",
    specialization: "Anxiety & Depression Specialist",
    image: doc15,
    availableDate: "2025-11-08",
    availableTime: "1:00 PM",
    category: "Anxiety",
    experience: "9 years",
    about:
      "Rajesh uses mindfulness and evidence-based methods to help clients overcome anxiety, stress, and burnout.",
  },
  
];

export default CouncelorsData;
