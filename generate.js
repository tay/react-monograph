const fs = require('fs');
const {faker} = require('@faker-js/faker');

const VENDORS = [
  {
    name: "Prop Labs Kolsch Beer Yeast",
    ingredients: ["YEAST"],
    source: {
      api: "REST",
      frequency: "Daily"
    }
  },
  {
    name: "Crudo Ogliarolo",
    ingredients: ["OLIVE_OIL"],
    source: {
      api: "PHONE",
      frequency: "Sporadic"
    }
  },
  {
    name: "San Marzano Whole Tomatoes",
    ingredients: ["TOMATOES"],
    source: {
      api: "WEBHOOK",
      frequency: "Live"
    }
  },
  {
    name: "Sonoma Farms",
    ingredients: ["MOZZARELLA", "OLIVE_OIL"],
    source: {
      api: "SMS",
      frequency: "Sporadic"
    }
  },
  {
    name: "Oakland Farmer's Market",
    ingredients: ["BASIL", "TOMATOES"],
    source: {
      api: "EMAIL",
      frequency: "Seasonal"
    }
  },
]

const QUALITY = ['A', 'A', 'A', 'A', 'B', 'B', 'B', 'C', 'D', 'F'];

const entries = Array(50).fill(0).map((_, i) => {
  const date = faker.date.between({ from: '2021-01-01', to: '2021-06-30'});
  const vendor = faker.helpers.arrayElement(VENDORS);
  const ingredient = faker.helpers.arrayElement(vendor.ingredients);
  const quality = faker.helpers.arrayElement(QUALITY);
  const count = faker.number.int(200);
  const notes = faker.company.catchPhrase();
  const verify = faker.datatype.boolean();

  return {
    date,
    ingredient,
    count,
    quality,
    vendor,
    notes,
    verify
  }
});


fs.writeFile('./pages/api/entries.json', JSON.stringify(entries), err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})