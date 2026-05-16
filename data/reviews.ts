export type Review = {
  id: number;
  stars: 4 | 5;
  variants: string[];
};

export type ResolvedReview = {
  id: number;
  stars: 4 | 5;
  text: string;
};

export function resolveVariant(r: Review): ResolvedReview {
  return {
    id: r.id,
    stars: r.stars,
    text: r.variants[Math.floor(Math.random() * r.variants.length)],
  };
}

export const GOOGLE_REVIEW_URL =
  "https://maps.google.com/?cid=3724387094041692977";

export const reviews: Review[] = [

  // SHORT CASUAL

  {
    id: 1,
    stars: 5,
    variants: [
      "Good shop. Been coming since 2 years. Always happy with the service.",
      "Coming here for about 2 years now. Always satisfied. Good place.",
      "Been a regular here for 2 years. Service is always good.",
    ],
  },
  {
    id: 2,
    stars: 5,
    variants: [
      "Best homeopathy store near Gotri. Owner knows his subject very well.",
      "Best homeopathic shop in the Gotri area. Owner is very knowledgeable.",
      "One of the best shops near Gotri for homeopathic medicines. Owner knows his work.",
    ],
  },
  {
    id: 3,
    stars: 5,
    variants: [
      "Medicines always in stock here. Quick service also. No waiting.",
      "Stock is always available and service is fast. No unnecessary waiting.",
      "Fast service every time. Medicines always available. No issues at all.",
    ],
  },
  {
    id: 4,
    stars: 4,
    variants: [
      "Very helpful. No pressure to buy anything extra. Refreshing experience.",
      "Helpful staff and no pressure at all. Good experience.",
      "No one pushes you to buy extra here. Helpful and honest.",
    ],
  },
  {
    id: 5,
    stars: 5,
    variants: [
      "Neat and clean shop. Owner explains properly before giving anything.",
      "Clean shop and owner always explains what the medicine is for.",
      "Nice and tidy store. Owner explains everything before giving medicine.",
    ],
  },
  {
    id: 6,
    stars: 5,
    variants: [
      "Too good. Our whole family buys from here only.",
      "Entire family shops here. No other place for us.",
      "My whole family trusts this shop. We don't go anywhere else.",
    ],
  },
  {
    id: 7,
    stars: 4,
    variants: [
      "Fair price. No overcharging at all. Very trusted place for us.",
      "Honest pricing here. No overcharging ever. Trusted shop.",
      "Prices are fair and transparent. No hidden costs. Reliable shop.",
    ],
  },
  {
    id: 8,
    stars: 5,
    variants: [
      "Sir listens first, then suggests. That approach itself is very good.",
      "Owner always listens before suggesting anything. Good approach.",
      "Listens to you properly before giving anything. That is what makes this place different.",
    ],
  },
  {
    id: 9,
    stars: 4,
    variants: [
      "Easy to find near Gotri road. Good parking nearby as well.",
      "Shop is easy to locate on Gotri road. Parking is also fine.",
      "Convenient location near Gotri. Easy parking and easy to find.",
    ],
  },
  {
    id: 10,
    stars: 5,
    variants: [
      "Original medicines only. No duplicates. I trust this place fully.",
      "Only authentic medicines here. No fake items. Fully trustworthy.",
      "Everything here is genuine. No duplicate products. I trust this shop completely.",
    ],
  },
  {
    id: 11,
    stars: 5,
    variants: [
      "Nice shop. Staff is polite and helpful every single time.",
      "Polite and helpful staff always. Nice experience every time.",
      "Staff is always cooperative and polite. Good place.",
    ],
  },
  {
    id: 12,
    stars: 5,
    variants: [
      "Everything available here. No need to go anywhere else for homeopathy.",
      "All homeopathic items available. No need to search elsewhere.",
      "Good stock. Whatever you need is available here. No other shop needed.",
    ],
  },
  {
    id: 13,
    stars: 4,
    variants: [
      "Good collection and prices are also reasonable. Happy customer.",
      "Wide range and prices are decent. Satisfied with the shop.",
      "Good variety and reasonable pricing. Happy overall.",
    ],
  },
  {
    id: 14,
    stars: 5,
    variants: [
      "Always open on time. Service is fast. No complaints at all.",
      "Opens on time every day. Service is quick. No issues.",
      "Punctual and fast service. Zero complaints from my side.",
    ],
  },
  {
    id: 15,
    stars: 5,
    variants: [
      "Owner is very friendly. Makes you feel comfortable to ask anything.",
      "Sir is very approachable. You can ask anything without hesitation.",
      "Very friendly owner. Never felt awkward asking questions here.",
    ],
  },
  {
    id: 16,
    stars: 5,
    variants: [
      "Small shop but everything is there. Good place overall.",
      "Compact store but fully stocked. Good overall.",
      "Looks small from outside but has everything you need. Good place.",
    ],
  },
  {
    id: 17,
    stars: 5,
    variants: [
      "Best place for homeopathic medicines in Vadodara. No second thought.",
      "Top homeopathic shop in Vadodara for me. No doubt about that.",
      "Best in Vadodara for homeopathy in my opinion. Highly recommend.",
    ],
  },
  {
    id: 18,
    stars: 4,
    variants: [
      "Good service. Medicines are properly stocked. Satisfied with the visit.",
      "Satisfied every time I visit. Good stock and good service.",
      "Nice experience. Medicines in stock, service is good. Happy.",
    ],
  },
  {
    id: 19,
    stars: 5,
    variants: [
      "Owner gives right medicine without any confusion. Very knowledgeable.",
      "Sir gives the correct medicine every time. Very knowledgeable person.",
      "Knowledgeable owner. Gives the right medicine without confusing you.",
    ],
  },
  {
    id: 20,
    stars: 5,
    variants: [
      "Quick service and proper guidance both together. Will keep visiting.",
      "Fast service and good guidance. Both together. Will come again.",
      "Good guidance and quick service. Best of both. Will keep coming.",
    ],
  },

  // MEDIUM

  {
    id: 21,
    stars: 5,
    variants: [
      "Friend told me about this place. Came once and now I keep coming back. Sir gives proper time and never rushes you out.",
      "My friend recommended this shop. Visited once and became a regular. Owner gives full attention to every customer.",
      "Came based on a friend's suggestion. Was very impressed. Owner listens properly and never makes you feel hurried.",
    ],
  },
  {
    id: 22,
    stars: 5,
    variants: [
      "Came to buy medicines for my mother. Sir explained everything step by step. She was very happy with how patiently he helped.",
      "Got medicines for my mother from here. Owner was very patient and clear in explaining. She felt comfortable.",
      "Brought my mother here. Sir took time to explain everything properly to her. Very happy with the experience.",
    ],
  },
  {
    id: 23,
    stars: 4,
    variants: [
      "Needed a specific medicine not available in regular stores. Found it here without any problem. Good stock maintained.",
      "Could not find a particular medicine elsewhere. This shop had it. Good stock they maintain.",
      "Specific homeopathic item that regular stores don't keep. Available here without any issue.",
    ],
  },
  {
    id: 24,
    stars: 5,
    variants: [
      "Visited for the first time last month. Was not sure what to expect. Owner explained everything so clearly that I felt confident. Will visit again.",
      "First visit was last month. The owner was very helpful and made everything clear. Now I will keep coming back.",
      "Came for the first time recently. Owner explained everything without making me feel confused. Definitely visiting again.",
    ],
  },
  {
    id: 25,
    stars: 5,
    variants: [
      "My doctor referred me here directly. After visiting I understood why. The owner knows homeopathy very well and it shows.",
      "Doctor gave me this reference personally. Visited and was fully satisfied. Owner's knowledge is impressive.",
      "Came on doctor's recommendation. Owner clearly knows his subject. Very trustworthy place.",
    ],
  },
  {
    id: 26,
    stars: 4,
    variants: [
      "Colleague at office told me about this shop. Good location in Gotri. Easy to reach and parking also fine.",
      "Heard about this from a colleague. Good location, easy to find. Parking nearby too.",
      "Office friend recommended this shop. Location is convenient and service is good.",
    ],
  },
  {
    id: 27,
    stars: 5,
    variants: [
      "Ordered online and delivery was fast. Medicines were packed properly. Good experience even without visiting the shop.",
      "Got home delivery from here. Came quickly and packing was proper. Happy with online service too.",
      "Ordered for home delivery. Arrived on time and packed well. Good service.",
    ],
  },
  {
    id: 28,
    stars: 5,
    variants: [
      "Went with my father. Owner was very patient with him, answered all his questions properly. Father was very comfortable talking to him.",
      "Took my father here. Sir was very patient and answered everything he asked. Father was satisfied.",
      "Brought my father along. Owner spoke to him with patience and care. Father felt very comfortable.",
    ],
  },
  {
    id: 29,
    stars: 5,
    variants: [
      "Not just selling medicines. Owner actually explains what each medicine does and why. That kind of service is hard to find.",
      "Owner does not just sell. He explains what each medicine does. Rare to find this kind of service.",
      "This place is more than just a shop. Owner genuinely helps you understand what you are taking and why.",
    ],
  },
  {
    id: 30,
    stars: 4,
    variants: [
      "Prices are fair and owner never pushed extra medicines. Gave only what was needed. Honest shop, appreciate that.",
      "No upselling here. Gives only what is needed at a fair price. Very honest.",
      "Owner gives what you need and nothing more. Honest pricing. Appreciated.",
    ],
  },
  {
    id: 31,
    stars: 5,
    variants: [
      "Shop is clean and medicines are properly arranged. Easy to browse inside. Good environment overall.",
      "Well organised inside. Medicines are arranged properly. Clean and pleasant.",
      "Clean store, everything neatly arranged. Good environment to shop in.",
    ],
  },
  {
    id: 32,
    stars: 5,
    variants: [
      "Family doctor specifically told us to visit Mayweed Remedies. After visiting I understand the recommendation completely. Very good place.",
      "Our family doctor referred us here specifically. Now I know why. Very trustworthy and knowledgeable.",
      "Doctor told us to come here by name. Visited and fully understood why. Excellent place.",
    ],
  },
  {
    id: 33,
    stars: 5,
    variants: [
      "Bought medicines for my kids. Sir explained doses very carefully. I felt confident taking them home after the conversation.",
      "Got medicines for my children. Owner explained dosage carefully and clearly. Felt safe and confident.",
      "Came for my child's medicines. Sir explained everything including dosage. Very helpful and careful.",
    ],
  },
  {
    id: 34,
    stars: 4,
    variants: [
      "Tried other places before. Was not satisfied. Here the quality is much better and owner actually helps you properly.",
      "Visited many shops before finding this one. This is the best in terms of quality and guidance.",
      "After trying several other stores I found this one. No comparison. Quality and service both are better here.",
    ],
  },
  {
    id: 35,
    stars: 5,
    variants: [
      "Was passing through Gotri area and decided to stop. Did not regret it at all. Good shop, will visit whenever needed.",
      "Stopped here while passing through Gotri. Was impressed. Will make it a point to visit again.",
      "Popped in while near the area. Glad I did. Good shop and helpful owner.",
    ],
  },
  {
    id: 36,
    stars: 5,
    variants: [
      "Came with my wife for some regular items. Owner remembered us from the last visit. That personal touch is very nice.",
      "Owner remembered us from a previous visit. That kind of personal attention is rare.",
      "He remembered us from last time. That personal touch makes a big difference.",
    ],
  },
  {
    id: 37,
    stars: 4,
    variants: [
      "Had a full list of medicines needed. All were available here. Did not have to go anywhere else. Saved a lot of time.",
      "Came with a long list. Everything was available. Saved the time of visiting multiple shops.",
      "Had multiple items to buy. All found here in one visit. Very convenient.",
    ],
  },
  {
    id: 38,
    stars: 5,
    variants: [
      "Needed to buy in bulk for our use. Good rates for bulk purchase also. Will continue buying from here regularly.",
      "Bought in bulk and the pricing was still fair. Will keep buying from here.",
      "Bulk purchase was easy and the rates were reasonable. Good place for regular buying.",
    ],
  },
  {
    id: 39,
    stars: 5,
    variants: [
      "Sir spends time understanding your requirement before suggesting anything. No rush at all. That is what I liked most.",
      "Owner takes time with every customer. No rushing. That is exactly what you want from a medical shop.",
      "Patient and thorough. Takes time to understand before suggesting anything. Liked that a lot.",
    ],
  },
  {
    id: 40,
    stars: 5,
    variants: [
      "Was recommended by a neighbour. First visit was very good. Owner was helpful and medicines were exactly what was needed.",
      "Neighbour told me about this shop. First visit went well. Owner is helpful and gives the right medicines.",
      "Came on neighbour's recommendation. Good experience on the first visit itself. Will continue coming.",
    ],
  },

  // LOYALTY

  {
    id: 41,
    stars: 5,
    variants: [
      "Coming here since 3 years. Not a single bad experience. Owner knows us by name now.",
      "3 years of visiting this shop. Always good. Owner knows us personally now.",
      "More than 3 years as a customer. Not once was there a bad experience.",
    ],
  },
  {
    id: 42,
    stars: 5,
    variants: [
      "Our family has been buying from this shop for a long time. Quality is always good. No compromise ever.",
      "Family has been coming here for years. Quality never drops. Very reliable.",
      "Long time family shop for homeopathic medicines. Quality is always consistent.",
    ],
  },
  {
    id: 43,
    stars: 4,
    variants: [
      "Regular customer here. Every visit same experience. Good service and medicines are proper.",
      "Come here regularly. Same good experience every time. Consistent service.",
      "Regular visitor. Every visit is good. No change in quality or service.",
    ],
  },
  {
    id: 44,
    stars: 5,
    variants: [
      "Been coming since 2022. Owner is always helpful. Will not go to any other store for homeopathy.",
      "Customer since 2022. Always helpful and quality never dropped. No other shop for homeopathy.",
      "Shopping here since 2022. Nothing has changed for the worse. Still the same quality.",
    ],
  },
  {
    id: 45,
    stars: 5,
    variants: [
      "This is my family's regular shop for homeopathy. My parents trust it completely and now I do too.",
      "My parents have been coming here for years. I started coming too and now I trust it completely.",
      "Family shop for homeopathy since years. Parents trusted it and now the whole family does.",
    ],
  },
  {
    id: 46,
    stars: 5,
    variants: [
      "Over 1 year as a customer. Not once was I given the wrong medicine. Owner takes his work seriously.",
      "More than a year of coming here. Never received wrong or bad medicine. Owner is very serious about quality.",
      "1 year plus as a regular customer. Not one mistake in all that time. Owner is careful and knowledgeable.",
    ],
  },
  {
    id: 47,
    stars: 5,
    variants: [
      "Referred many friends here. All of them are now regulars also. That tells you everything about this place.",
      "Told many people about this shop. All of them became regulars. That says enough.",
      "Recommended this to many friends and family. All happy. No one went back to other stores after visiting here.",
    ],
  },
  {
    id: 48,
    stars: 5,
    variants: [
      "Long time customer. The shop has only gotten better over time. Always good stock, always helpful.",
      "Been coming here for a long time. Quality has only improved. Good stock always.",
      "Old customer here. Shop keeps getting better. Stock is always good.",
    ],
  },
  {
    id: 49,
    stars: 4,
    variants: [
      "My wife and I both buy from here regularly. Never felt overcharged or misguided. Very honest place.",
      "Both me and my wife are regular customers. Never had a bad experience. Honest and reliable.",
      "Regular buyers for the whole family. Never overcharged. Always honest service.",
    ],
  },
  {
    id: 50,
    stars: 5,
    variants: [
      "Loyal customer for 2 years. Recommended this shop to my whole building. Everyone is satisfied with it.",
      "2 years of loyalty to this shop. Told many neighbours. All of them happy.",
      "Been coming for 2 years. Told everyone in my society about this place. All of them are now customers.",
    ],
  },
];
