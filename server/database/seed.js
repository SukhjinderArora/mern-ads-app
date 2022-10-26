const mongoose = require("mongoose");

const Company = require("../models/Company");
const Advert = require("../models/Advert");

const companies = [
  {
    name: "Salesforce",
    url: "https://salesforce.com",
    adverts: [
      {
        primaryText:
          "The world’s leading CRM is ready to help you simplify the business part of your small business.",
        headline: "Salesforce for Small Business",
        description: "",
        cta: "Sign Up",
        imageURL:
          "https://www.salesforce.com/news/wp-content/uploads/sites/3/2020/08/comcus.png",
      },
    ],
  },
  {
    name: "Levi's",
    url: "https:/levis.com/",
    adverts: [
      {
        primaryText: "We like where you’re going with this.",
        headline: "Relaxed Fit Men's Jeans",
        description: "",
        cta: "Shop Now",
        imageURL: "https://m.media-amazon.com/images/I/51mzBEfsCgL._UX679_.jpg",
      },
      {
        primaryText: "We like where you’re going with this.",
        headline: "Levi's Women's Jeans",
        description: "",
        cta: "Shop Now",
        imageURL:
          "https://cdn.luxe.digital/media/2020/10/15203549/best-jeans-brands-women-denim-levis-luxe-digital.jpg",
      },
    ],
  },
  {
    name: "Puma",
    url: "https://puma.com",
    adverts: [],
  },
  {
    name: "Adidas",
    url: "https://adidas.com",
    adverts: [],
  },
  {
    name: "Nike",
    url: "https://nike.com",
    adverts: [],
  },
  {
    name: "Cotopaxi",
    url: "https://cotopaxi.com",
    adverts: [
      {
        primaryText:
          "Teva x Cotopaxi is back! Celebrate eternal summer with limited-edition Teva x Cotopaxi Original Universal sandals in bold new colors.",
        headline: "Made With Recycled Plastic",
        description: "Shop Back to School",
        cta: "Shop Now",
        imageURL:
          "https://images.milledcdn.com/2018-11-27/6jEo_PVn8ZGmpoql/kApc8X9zXWSv.png",
      },
    ],
  },
  {
    name: "Netflix",
    url: "https://netflix.com",
    adverts: [
      {
        primaryText:
          "The Emmy-nominated Netflix comedy special from the late Norm Macdonald is his last gift to the world of comedy he helped shape.",
        headline:
          "Norm Macdonald's Nothing Special gives one last dose of the late comic",
        description: "",
        cta: "Learn More",
        imageURL:
          "https://brioux.tv/wp-content/uploads/2022/05/p22186695_b_h8_aa-270x180.jpg",
      },
    ],
  },
  {
    name: "Colgate",
    url: "https://colgate.com",
    adverts: [],
  },
  {
    name: "Valentino",
    url: "https://valentino.com",
    adverts: [
      {
        primaryText:
          "Visit Valentino.com, discover the new products and shop now!",
        headline: "Valentino Hexagonal Metal Frame With Crystal Studs",
        description: "",
        cta: "Shop Now",
        imageURL:
          "https://www.fashiongonerogue.com/wp-content/uploads/2014/06/valentino-spring-2006-ad-campaign1.jpg",
      },
    ],
  },
  {
    name: "Curology",
    url: "https://curology.com",
    adverts: [
      {
        primaryText:
          "Dark spots. Breakouts. Rosacea. Dull skin. Fine lines. Our formulas are custom-mixed for YOUR skin concerns.",
        headline: "Personalized skincare for dark spots, acne, and more.",
        description:
          "Personalized skincare for dark spots, acne, and more. Results may vary.",
        cta: "Order Now",
        imageURL:
          "https://images.ctfassets.net/mdcr7mahi0vp/1uuBYSEqeWy3fBKxNIHbTF/6f63182fcbd9c34ec6d1bf9d5ce45ae4/teens.png?w=700&h=1229&q=99&fm=png",
      },
    ],
  },
  {
    name: "Purple",
    url: "https://purple.com",
    adverts: [
      {
        primaryText:
          "Say ‘goodnight’ to sleeping hot 🔥 with Purple products—designed to dissipate heat.",
        headline: "Cooler Summers Start Here",
        description: "Shop Purple products, designed to help you sleep cool.",
        cta: "Shop Now",
        imageURL:
          "https://assets.roomstogo.com/MOCK_PURPLE_V3_HEADER_MOBILE_CN_640x440__1_.png?cache-id=n%2Fa",
      },
    ],
  },
];

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://username:password@cluster0.1hqidqg.mongodb.net/?retryWrites=true&w=majority`
    );
    await Company.deleteMany({});
    await Advert.deleteMany({});
    for (const company of companies) {
      const createdCompany = await Company.create({
        name: company.name,
        url: company.url,
      });
      for (const ad of company.adverts) {
        const createdAd = await Advert.create({
          primaryText: ad.primaryText,
          headline: ad.headline,
          description: ad.description,
          cta: ad.cta,
          imageURL: ad.imageURL,
          company: createdCompany,
        });
        createdCompany.adverts.push(createdAd);
        await createdCompany.save();
      }
      console.log(createdCompany);
    }
  } catch (error) {
    console.log(error);
  }
}

main().then(() => {
  mongoose.connection.close();
});
