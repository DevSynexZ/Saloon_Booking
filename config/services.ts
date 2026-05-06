// config/services.ts

export type Service = {
  id: string;
  name: string;
  price: number;
};

export type MenuPage = {
  category: string;
  categoryIcon: string; // Will correspond to a Lucide icon name
  services: Service[];
};

export const salonMenu: MenuPage[] = [
  {
    category: "Basic Care",
    categoryIcon: "Scissors",
    services: [
      { id: "bc1", name: "Hair Cut (Regular)", price: 300 },
      { id: "bc2", name: "Hair Cut (Regular) & Hair Wash", price: 400 },
      { id: "bc3", name: "Hair Cut (Styles) & Hair Wash", price: 500 },
      { id: "bc4", name: "Shave/Trim", price: 200 },
      { id: "bc5", name: "Head Massage (10 minutes)", price: 200 },
      { id: "bc6", name: "Hair Set", price: 200 },
      { id: "bc7", name: "Hair Blow Dry", price: 200 },
    ],
  },
  {
    category: "Facial Care",
    categoryIcon: "Sparkles",
    services: [
      { id: "fc1", name: "Herbal Facial", price: 1200 },
      { id: "fc2", name: "Booty Facial", price: 1500 },
      { id: "fc3", name: "Bee One Gold Facial", price: 2000 },
      { id: "fc4", name: "Bee One Fruit Facial", price: 1800 },
      { id: "fc5", name: "Bee One Papaya Facial", price: 1500 },
      { id: "fc6", name: "Whitening Facial", price: 2500 },
    ],
  },
  {
    category: "Hair Color",
    categoryIcon: "Palette",
    services: [
      { id: "hc1", name: "BREAD Color", price: 500 },
      { id: "hc2", name: "HENA Mehdi Color", price: 500 },
      { id: "hc3", name: "HI SPEED Hair Color", price: 800 },
      { id: "hc4", name: "REVLON Hair Color", price: 1000 },
      { id: "hc5", name: "BIGEN Hair Color", price: 1000 },
      { id: "hc6", name: "LOREAL Hair Color", price: 1200 },
      { id: "hc7", name: "JUST FOR MEN Hair Color", price: 1500 },
    ],
  },
  {
    category: "Body Care (Massage)",
    categoryIcon: "Flower",
    services: [
      { id: "ma1", name: "Chair Massage (20 Min)", price: 500 },
      { id: "ma2", name: "Body Massage", price: 1500 },
      { id: "ma3", name: "Aroma Oil Body Massage", price: 1800 },
      { id: "ma4", name: "Hot Oil Body Massage", price: 2000 },
      { id: "ma5", name: "Thai Body Massage", price: 2000 },
      { id: "ma6", name: "Deep Tissue Body Massage", price: 2200 },
      { id: "ma7", name: "Black Cumin Oil Body Massage", price: 2500 },
    ],
  },
];