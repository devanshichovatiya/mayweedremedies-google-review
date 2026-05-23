export type ResolvedReview = {
  id: number;   // 1–150 for static; 151+ for AI-generated
  stars: 4 | 5;
  text: string;
};

export function getAllStaticReviews(): ResolvedReview[] {
  return reviews;
}

export const GOOGLE_REVIEW_URL = "https://g.page/r/XXXXXXXXXX/review";

// 150 reviews ordered 3 × 5-star then 1 × 4-star, repeating.
// IDs are sequential 1–150 matching array position.
export const reviews: ResolvedReview[] = [

  // --- group 1 ---
  { id: 1,   stars: 5, text: "Good shop. Been coming since 2 years. Always happy with the service." },
  { id: 2,   stars: 5, text: "Coming here for about 2 years now. Always satisfied. Good place." },
  { id: 3,   stars: 5, text: "Been a regular here for 2 years. Service is always good." },
  { id: 4,   stars: 4, text: "Very helpful. No pressure to buy anything extra. Refreshing experience." },

  // --- group 2 ---
  { id: 5,   stars: 5, text: "Best homeopathy store near Gotri. Owner knows his subject very well." },
  { id: 6,   stars: 5, text: "Best homeopathic shop in the Gotri area. Owner is very knowledgeable." },
  { id: 7,   stars: 5, text: "One of the best shops near Gotri for homeopathic medicines. Owner knows his work." },
  { id: 8,   stars: 4, text: "Helpful staff and no pressure at all. Good experience." },

  // --- group 3 ---
  { id: 9,   stars: 5, text: "Medicines always in stock here. Quick service also. No waiting." },
  { id: 10,  stars: 5, text: "Stock is always available and service is fast. No unnecessary waiting." },
  { id: 11,  stars: 5, text: "Fast service every time. Medicines always available. No issues at all." },
  { id: 12,  stars: 4, text: "No one pushes you to buy extra here. Helpful and honest." },

  // --- group 4 ---
  { id: 13,  stars: 5, text: "Neat and clean shop. Owner explains properly before giving anything." },
  { id: 14,  stars: 5, text: "Clean shop and owner always explains what the medicine is for." },
  { id: 15,  stars: 5, text: "Nice and tidy store. Owner explains everything before giving medicine." },
  { id: 16,  stars: 4, text: "Fair price. No overcharging at all. Very trusted place for us." },

  // --- group 5 ---
  { id: 17,  stars: 5, text: "Too good. Our whole family buys from here only." },
  { id: 18,  stars: 5, text: "Entire family shops here. No other place for us." },
  { id: 19,  stars: 5, text: "My whole family trusts this shop. We don't go anywhere else." },
  { id: 20,  stars: 4, text: "Honest pricing here. No overcharging ever. Trusted shop." },

  // --- group 6 ---
  { id: 21,  stars: 5, text: "Sir listens first, then suggests. That approach itself is very good." },
  { id: 22,  stars: 5, text: "Owner always listens before suggesting anything. Good approach." },
  { id: 23,  stars: 5, text: "Listens to you properly before giving anything. That is what makes this place different." },
  { id: 24,  stars: 4, text: "Prices are fair and transparent. No hidden costs. Reliable shop." },

  // --- group 7 ---
  { id: 25,  stars: 5, text: "Original medicines only. No duplicates. I trust this place fully." },
  { id: 26,  stars: 5, text: "Only authentic medicines here. No fake items. Fully trustworthy." },
  { id: 27,  stars: 5, text: "Everything here is genuine. No duplicate products. I trust this shop completely." },
  { id: 28,  stars: 4, text: "Easy to find near Gotri road. Good parking nearby as well." },

  // --- group 8 ---
  { id: 29,  stars: 5, text: "Nice shop. Staff is polite and helpful every single time." },
  { id: 30,  stars: 5, text: "Polite and helpful staff always. Nice experience every time." },
  { id: 31,  stars: 5, text: "Staff is always cooperative and polite. Good place." },
  { id: 32,  stars: 4, text: "Shop is easy to locate on Gotri road. Parking is also fine." },

  // --- group 9 ---
  { id: 33,  stars: 5, text: "Everything available here. No need to go anywhere else for homeopathy." },
  { id: 34,  stars: 5, text: "All homeopathic items available. No need to search elsewhere." },
  { id: 35,  stars: 5, text: "Good stock. Whatever you need is available here. No other shop needed." },
  { id: 36,  stars: 4, text: "Convenient location near Gotri. Easy parking and easy to find." },

  // --- group 10 ---
  { id: 37,  stars: 5, text: "Always open on time. Service is fast. No complaints at all." },
  { id: 38,  stars: 5, text: "Opens on time every day. Service is quick. No issues." },
  { id: 39,  stars: 5, text: "Punctual and fast service. Zero complaints from my side." },
  { id: 40,  stars: 4, text: "Good collection and prices are also reasonable. Happy customer." },

  // --- group 11 ---
  { id: 41,  stars: 5, text: "Owner is very friendly. Makes you feel comfortable to ask anything." },
  { id: 42,  stars: 5, text: "Sir is very approachable. You can ask anything without hesitation." },
  { id: 43,  stars: 5, text: "Very friendly owner. Never felt awkward asking questions here." },
  { id: 44,  stars: 4, text: "Wide range and prices are decent. Satisfied with the shop." },

  // --- group 12 ---
  { id: 45,  stars: 5, text: "Small shop but everything is there. Good place overall." },
  { id: 46,  stars: 5, text: "Compact store but fully stocked. Good overall." },
  { id: 47,  stars: 5, text: "Looks small from outside but has everything you need. Good place." },
  { id: 48,  stars: 4, text: "Good variety and reasonable pricing. Happy overall." },

  // --- group 13 ---
  { id: 49,  stars: 5, text: "Best place for homeopathic medicines in Vadodara. No second thought." },
  { id: 50,  stars: 5, text: "Top homeopathic shop in Vadodara for me. No doubt about that." },
  { id: 51,  stars: 5, text: "Best in Vadodara for homeopathy in my opinion. Highly recommend." },
  { id: 52,  stars: 4, text: "Good service. Medicines are properly stocked. Satisfied with the visit." },

  // --- group 14 ---
  { id: 53,  stars: 5, text: "Owner gives right medicine without any confusion. Very knowledgeable." },
  { id: 54,  stars: 5, text: "Sir gives the correct medicine every time. Very knowledgeable person." },
  { id: 55,  stars: 5, text: "Knowledgeable owner. Gives the right medicine without confusing you." },
  { id: 56,  stars: 4, text: "Satisfied every time I visit. Good stock and good service." },

  // --- group 15 ---
  { id: 57,  stars: 5, text: "Quick service and proper guidance both together. Will keep visiting." },
  { id: 58,  stars: 5, text: "Fast service and good guidance. Both together. Will come again." },
  { id: 59,  stars: 5, text: "Good guidance and quick service. Best of both. Will keep coming." },
  { id: 60,  stars: 4, text: "Nice experience. Medicines in stock, service is good. Happy." },

  // --- group 16 ---
  { id: 61,  stars: 5, text: "Friend told me about this place. Came once and now I keep coming back. Sir gives proper time and never rushes you out." },
  { id: 62,  stars: 5, text: "My friend recommended this shop. Visited once and became a regular. Owner gives full attention to every customer." },
  { id: 63,  stars: 5, text: "Came based on a friend's suggestion. Was very impressed. Owner listens properly and never makes you feel hurried." },
  { id: 64,  stars: 4, text: "Needed a specific medicine not available in regular stores. Found it here without any problem. Good stock maintained." },

  // --- group 17 ---
  { id: 65,  stars: 5, text: "Came to buy medicines for my mother. Sir explained everything step by step. She was very happy with how patiently he helped." },
  { id: 66,  stars: 5, text: "Got medicines for my mother from here. Owner was very patient and clear in explaining. She felt comfortable." },
  { id: 67,  stars: 5, text: "Brought my mother here. Sir took time to explain everything properly to her. Very happy with the experience." },
  { id: 68,  stars: 4, text: "Could not find a particular medicine elsewhere. This shop had it. Good stock they maintain." },

  // --- group 18 ---
  { id: 69,  stars: 5, text: "Visited for the first time last month. Was not sure what to expect. Owner explained everything so clearly that I felt confident. Will visit again." },
  { id: 70,  stars: 5, text: "First visit was last month. The owner was very helpful and made everything clear. Now I will keep coming back." },
  { id: 71,  stars: 5, text: "Came for the first time recently. Owner explained everything without making me feel confused. Definitely visiting again." },
  { id: 72,  stars: 4, text: "Specific homeopathic item that regular stores don't keep. Available here without any issue." },

  // --- group 19 ---
  { id: 73,  stars: 5, text: "My doctor referred me here directly. After visiting I understood why. The owner knows homeopathy very well and it shows." },
  { id: 74,  stars: 5, text: "Doctor gave me this reference personally. Visited and was fully satisfied. Owner's knowledge is impressive." },
  { id: 75,  stars: 5, text: "Came on doctor's recommendation. Owner clearly knows his subject. Very trustworthy place." },
  { id: 76,  stars: 4, text: "Colleague at office told me about this shop. Good location in Gotri. Easy to reach and parking also fine." },

  // --- group 20 ---
  { id: 77,  stars: 5, text: "Ordered online and delivery was fast. Medicines were packed properly. Good experience even without visiting the shop." },
  { id: 78,  stars: 5, text: "Got home delivery from here. Came quickly and packing was proper. Happy with online service too." },
  { id: 79,  stars: 5, text: "Ordered for home delivery. Arrived on time and packed well. Good service." },
  { id: 80,  stars: 4, text: "Heard about this from a colleague. Good location, easy to find. Parking nearby too." },

  // --- group 21 ---
  { id: 81,  stars: 5, text: "Went with my father. Owner was very patient with him, answered all his questions properly. Father was very comfortable talking to him." },
  { id: 82,  stars: 5, text: "Took my father here. Sir was very patient and answered everything he asked. Father was satisfied." },
  { id: 83,  stars: 5, text: "Brought my father along. Owner spoke to him with patience and care. Father felt very comfortable." },
  { id: 84,  stars: 4, text: "Office friend recommended this shop. Location is convenient and service is good." },

  // --- group 22 ---
  { id: 85,  stars: 5, text: "Not just selling medicines. Owner actually explains what each medicine does and why. That kind of service is hard to find." },
  { id: 86,  stars: 5, text: "Owner does not just sell. He explains what each medicine does. Rare to find this kind of service." },
  { id: 87,  stars: 5, text: "This place is more than just a shop. Owner genuinely helps you understand what you are taking and why." },
  { id: 88,  stars: 4, text: "Prices are fair and owner never pushed extra medicines. Gave only what was needed. Honest shop, appreciate that." },

  // --- group 23 ---
  { id: 89,  stars: 5, text: "Shop is clean and medicines are properly arranged. Easy to browse inside. Good environment overall." },
  { id: 90,  stars: 5, text: "Well organised inside. Medicines are arranged properly. Clean and pleasant." },
  { id: 91,  stars: 5, text: "Clean store, everything neatly arranged. Good environment to shop in." },
  { id: 92,  stars: 4, text: "No upselling here. Gives only what is needed at a fair price. Very honest." },

  // --- group 24 ---
  { id: 93,  stars: 5, text: "Family doctor specifically told us to visit Mayweed Remedies. After visiting I understood the recommendation completely. Very good place." },
  { id: 94,  stars: 5, text: "Our family doctor referred us here specifically. Now I know why. Very trustworthy and knowledgeable." },
  { id: 95,  stars: 5, text: "Doctor told us to come here by name. Visited and fully understood why. Excellent place." },
  { id: 96,  stars: 4, text: "Owner gives what you need and nothing more. Honest pricing. Appreciated." },

  // --- group 25 ---
  { id: 97,  stars: 5, text: "Bought medicines for my kids. Sir explained doses very carefully. I felt confident taking them home after the conversation." },
  { id: 98,  stars: 5, text: "Got medicines for my children. Owner explained dosage carefully and clearly. Felt safe and confident." },
  { id: 99,  stars: 5, text: "Came for my child's medicines. Sir explained everything including dosage. Very helpful and careful." },
  { id: 100, stars: 4, text: "Tried other places before. Was not satisfied. Here the quality is much better and owner actually helps you properly." },

  // --- group 26 ---
  { id: 101, stars: 5, text: "Was passing through Gotri area and decided to stop. Did not regret it at all. Good shop, will visit whenever needed." },
  { id: 102, stars: 5, text: "Stopped here while passing through Gotri. Was impressed. Will make it a point to visit again." },
  { id: 103, stars: 5, text: "Popped in while near the area. Glad I did. Good shop and helpful owner." },
  { id: 104, stars: 4, text: "Visited many shops before finding this one. This is the best in terms of quality and guidance." },

  // --- group 27 ---
  { id: 105, stars: 5, text: "Came with my wife for some regular items. Owner remembered us from the last visit. That personal touch is very nice." },
  { id: 106, stars: 5, text: "Owner remembered us from a previous visit. That kind of personal attention is rare." },
  { id: 107, stars: 5, text: "He remembered us from last time. That personal touch makes a big difference." },
  { id: 108, stars: 4, text: "After trying several other stores I found this one. No comparison. Quality and service both are better here." },

  // --- group 28 ---
  { id: 109, stars: 5, text: "Needed to buy in bulk for our use. Good rates for bulk purchase also. Will continue buying from here regularly." },
  { id: 110, stars: 5, text: "Bought in bulk and the pricing was still fair. Will keep buying from here." },
  { id: 111, stars: 5, text: "Bulk purchase was easy and the rates were reasonable. Good place for regular buying." },
  { id: 112, stars: 4, text: "Had a full list of medicines needed. All were available here. Did not have to go anywhere else. Saved a lot of time." },

  // --- group 29 ---
  { id: 113, stars: 5, text: "Sir spends time understanding your requirement before suggesting anything. No rush at all. That is what I liked most." },
  { id: 114, stars: 5, text: "Owner takes time with every customer. No rushing. That is exactly what you want from a medical shop." },
  { id: 115, stars: 5, text: "Patient and thorough. Takes time to understand before suggesting anything. Liked that a lot." },
  { id: 116, stars: 4, text: "Came with a long list. Everything was available. Saved the time of visiting multiple shops." },

  // --- group 30 ---
  { id: 117, stars: 5, text: "Was recommended by a neighbour. First visit was very good. Owner was helpful and medicines were exactly what was needed." },
  { id: 118, stars: 5, text: "Neighbour told me about this shop. First visit went well. Owner is helpful and gives the right medicines." },
  { id: 119, stars: 5, text: "Came on neighbour's recommendation. Good experience on the first visit itself. Will continue coming." },
  { id: 120, stars: 4, text: "Had multiple items to buy. All found here in one visit. Very convenient." },

  // --- group 31 ---
  { id: 121, stars: 5, text: "Coming here since 3 years. Not a single bad experience. Owner knows us by name now." },
  { id: 122, stars: 5, text: "3 years of visiting this shop. Always good. Owner knows us personally now." },
  { id: 123, stars: 5, text: "More than 3 years as a customer. Not once was there a bad experience." },
  { id: 124, stars: 4, text: "Regular customer here. Every visit same experience. Good service and medicines are proper." },

  // --- group 32 ---
  { id: 125, stars: 5, text: "Our family has been buying from this shop for a long time. Quality is always good. No compromise ever." },
  { id: 126, stars: 5, text: "Family has been coming here for years. Quality never drops. Very reliable." },
  { id: 127, stars: 5, text: "Long time family shop for homeopathic medicines. Quality is always consistent." },
  { id: 128, stars: 4, text: "Come here regularly. Same good experience every time. Consistent service." },

  // --- group 33 ---
  { id: 129, stars: 5, text: "Been coming since 2022. Owner is always helpful. Will not go to any other store for homeopathy." },
  { id: 130, stars: 5, text: "Customer since 2022. Always helpful and quality never dropped. No other shop for homeopathy." },
  { id: 131, stars: 5, text: "Shopping here since 2022. Nothing has changed for the worse. Still the same quality." },
  { id: 132, stars: 4, text: "Regular visitor. Every visit is good. No change in quality or service." },

  // --- group 34 ---
  { id: 133, stars: 5, text: "This is my family's regular shop for homeopathy. My parents trust it completely and now I do too." },
  { id: 134, stars: 5, text: "My parents have been coming here for years. I started coming too and now I trust it completely." },
  { id: 135, stars: 5, text: "Family shop for homeopathy since years. Parents trusted it and now the whole family does." },
  { id: 136, stars: 4, text: "My wife and I both buy from here regularly. Never felt overcharged or misguided. Very honest place." },

  // --- group 35 ---
  { id: 137, stars: 5, text: "Over 1 year as a customer. Not once was I given the wrong medicine. Owner takes his work seriously." },
  { id: 138, stars: 5, text: "More than a year of coming here. Never received wrong or bad medicine. Owner is very serious about quality." },
  { id: 139, stars: 5, text: "1 year plus as a regular customer. Not one mistake in all that time. Owner is careful and knowledgeable." },
  { id: 140, stars: 4, text: "Both me and my wife are regular customers. Never had a bad experience. Honest and reliable." },

  // --- group 36 ---
  { id: 141, stars: 5, text: "Referred many friends here. All of them are now regulars also. That tells you everything about this place." },
  { id: 142, stars: 5, text: "Told many people about this shop. All of them became regulars. That says enough." },
  { id: 143, stars: 5, text: "Recommended this to many friends and family. All happy. No one went back to other stores after visiting here." },
  { id: 144, stars: 4, text: "Regular buyers for the whole family. Never overcharged. Always honest service." },

  // --- remaining 5-stars (pool exhausted 4-stars) ---
  { id: 145, stars: 5, text: "Long time customer. The shop has only gotten better over time. Always good stock, always helpful." },
  { id: 146, stars: 5, text: "Been coming here for a long time. Quality has only improved. Good stock always." },
  { id: 147, stars: 5, text: "Old customer here. Shop keeps getting better. Stock is always good." },
  { id: 148, stars: 5, text: "Loyal customer for 2 years. Recommended this shop to my whole building. Everyone is satisfied with it." },
  { id: 149, stars: 5, text: "2 years of loyalty to this shop. Told many neighbours. All of them happy." },
  { id: 150, stars: 5, text: "Been coming for 2 years. Told everyone in my society about this place. All of them are now customers." },
];
