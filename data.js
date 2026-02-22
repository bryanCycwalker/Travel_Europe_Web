window.DATA = {
    events: [
        // Belgium Trip
        {
            date:'2023-09-29<br>2023-10-04', text:'Belgium Trip', countryCandidates:['be','de'], home: ['housePoint1'], 
            markerIds: ['housePoint1', 'betrip1','betrip2','betrip3','betrip4','betrip5'],
            eventMarkers: [
                { 
                    id: "housePoint1", 
                    date: "2023-09-29", 
                    city: "Munich", 
                    type: "start",
                    link: "Germany.html",
                    labelOffset: { x: 2, y: 0 },
                    desc: "旅程開始，從慕尼黑出發。",
                    notes: [
                        { photo: "Photos/Germany/Munich/Belgium_Trip/bru1 (Small).JPEG", text: "As a newcomer to Germany, I was shocked to see a <span style='font-size:1.3em; font-weight:bold; color: #A32020;'>German drinking beer for breakfast</span> <br>at the airport</br>" },
                        { photo: "Photos/Germany/Munich/Belgium_Trip/bru2 (Small).JPEG", text: "Boarding the first Intra-European flights in my life, I was more than excited!" }
                    ]
                },
                { 
                    id: "betrip1", 
                    city: "Brussels", 
                    date: "2023-09-29", 
                    type: "waypoint",
                    link: "Belgium.html",
                    labelOffset: { x: 0, y: 1.5 },
                    desc: "Solo Day Trip", 
                    notes: [
                        { 
                            title: "Cathedral of <br>St. Michael and St. Gudula</br>", 
                            photo: "Photos/Belgium/Brussels/Belgium_Trip/bru3 (Small).JPEG", text: "a supreme place I later learned the Kings and Queens of Belgium are crowned." 
                        },
                        { 
                            title:"Royal Saint-Hubert Galleries", 
                            photo1: "Photos/Belgium/Brussels/Belgium_Trip/bru4 (Small).JPEG", text1: "No arts, but elegant foods", 
                            photo2: "Photos/Belgium/Brussels/Belgium_Trip/bru5 (Small).jpg", text2: "Of course I had some typical <span style='font-size:1.3em; font-weight:bold; color: #A32020;'>Belgium WAFFLE</span> there...", 
                            photo3: "Photos/Belgium/Brussels/Belgium_Trip/bru6 (Small).jpg", text3: "and witnessed how <span style='font-size:1.3em; font-weight:bold; color: #A32020;'>crazy</span> Belgium loves them haha"
                        },
                        { 
                            title:"Grand-Place", 
                            photo1: "Photos/Belgium/Brussels/Belgium_Trip/bru7 (Small).jpg", text1: "A famous UNESCO site...", 
                            photo2: "Photos/Belgium/Brussels/Belgium_Trip/bru1 (Small).mp4", text2: "with a Video!" 
                        },
                        { 
                            title: "Brussels City Hall", 
                            photo1: "Photos/Belgium/Brussels/Belgium_Trip/bru8 (Small).jpg", text1: "...", 
                            photo2: "Photos/Belgium/Brussels/Belgium_Trip/bru9 (Small).jpg", text2: "<span style='font-size:1.3em; font-weight:bold; color: #A32020;'>with me!</span>" 
                        },
                        { 
                            title: "Brussels City Museum",
                            photo1: "Photos/Belgium/Brussels/Belgium_Trip/bru10 (Small).jpg", text1: "It is the authentic building on the left, <br>on the opposite of the City Hall.", 
                            photo2: "Photos/Belgium/Brussels/Belgium_Trip/bru11 (Small).jpg", text2: "This is a model of the old Brussels", 
                            photo3: "Photos/Belgium/Brussels/Belgium_Trip/bru12 (Small).jpg", text3: "Do you know, the <span style='font-size:1.3em; font-weight:bold; color: #A32020;'>original piece of Manneken Pis</span> <br>is stored here!</br>", 
                            photo4: "Photos/Belgium/Brussels/Belgium_Trip/bru13 (Small).jpg", text4: "And a Manneken Pis of <span style='font-size:1.5em; font-weight:bold; color: #A32020;'>侍(SAMURAI)</span>" 
                        },
                        { 
                            photo: "Photos/Belgium/Brussels/Belgium_Trip/bru14 (Small).jpg", 
                            text: "This is the Manneken Pis replica. <br>Don't know why so many took phots with a fake one <span style='font-size:1.5em; font-weight:bold; color: #A32020;'>:)</span></br>" 
                        },
                        { 
                            photo1: "Photos/Belgium/Brussels/Belgium_Trip/bru15 (Small).jpg", 
                            photo2: "Photos/Belgium/Brussels/Belgium_Trip/bru16 (Small).jpg", text2: "Some charmingly quirky old buildings" 
                        },
                        { 
                            title:"Royal Museums of <br>Fine Arts of Belgium</br>", 
                            photo1: "Photos/Belgium/Brussels/Belgium_Trip/bru17 (Small).jpg", text1: "An allegedly world-famous Gallery.",
                            photo2: "Photos/Belgium/Brussels/Belgium_Trip/bru18 (Small).jpg", 
                            photo3: "Photos/Belgium/Brussels/Belgium_Trip/bru19 (Small).jpg", text3: "First I thought it was the renownd 'De Toren van Babel'. <br>I was wrong. But I would soon admire it in half a year!</br>",
                            photo4: "Photos/Belgium/Brussels/Belgium_Trip/bru20 (Small).jpg", text4: "And I <span style='font-size:1.5em; font-weight:bold; color: #A32020;'>love the the use of light, shadow, and spatial variation</span> in the paintings." 
                        },
                        { 
                            title:"Church of Our Lady of <br>Victories at the Sablon</br>", 
                            photo: "Photos/Belgium/Brussels/Belgium_Trip/bru21 (Small).jpg", text: "I found the nave magnificently high up!" 
                        },
                        { 
                            title:"Royal Palace of Brussels", 
                            photo: "Photos/Belgium/Brussels/Belgium_Trip/bru22 (Small).jpg", text: "Just pass by. Honestly, nothing special from the outside..." 
                        },
                        { 
                            title:"Parc de Bruxelles", 
                            photo: "Photos/Belgium/Brussels/Belgium_Trip/bru23 (Small).jpg", text: "The fountain in it was glimmering in the late afternoon" 
                        },
                        { 
                            photo: "Photos/Belgium/Brussels/Belgium_Trip/bru2 (Small).mp4", text1: "Last but not least, lets meet my <span style='font-size:1.5em; font-weight:bold; color: #A32020;'>friend since senior high school</span> <br>at the Brussels main station!!</br>", 
                                                                            text2: "See how <span style='font-size:1.5em; font-weight:bold; color: #A32020;'>joyful</span> he was hahaha!!" 
                        },
                    ]
                },
                { id: "betrip2", city: "Leuven", date: "2023-09-29", img: "", labelOffset: { x: 2, y: -0.5 }, stay: "Overnight in Leuven", link: "", linkText: "" },
                { id: "betrip2", city: "Leuven", date: "2023-09-30", img: "", labelOffset: { x: 2, y: -0.5 }, stay: "Overnight in Leuven", link: "", linkText: "" },
                { 
                    id: "betrip3", 
                    city: "Antwerp", 
                    date: "2023-09-30", 
                    type: "waypoint",
                    link: "Belgium.html",
                    labelOffset: { x: 0, y: -1.5 },
                    desc: "Remarkable Railway Station",
                    notes: [
                        { 
                            title:"Antwerp Central Station", 
                            photo1: "Photos/Belgium/Antwerp/Belgium_Trip/ant1 (Small).jpg", text1: "The most classical and beautiful railway station in Europe!",
                            photo2: "Photos/Belgium/Antwerp/Belgium_Trip/ant2 (Small).jpg", 
                        },
                        { 
                            title:"Meir Shopping Street", 
                            photo1: "Photos/Belgium/Antwerp/Belgium_Trip/ant3 (Small).jpg", text1: "We walked <span style='font-size:1.5em; font-weight:bold; color: #A32020;'>so chill</span> along the way,", 
                            photo2: "Photos/Belgium/Antwerp/Belgium_Trip/ant4 (Small).jpg", text2: "which connects central station down to the harbour", 
                            photo3: "Photos/Belgium/Antwerp/Belgium_Trip/ant1 (Small).mp4", 
                            photo4: "Photos/Belgium/Antwerp/Belgium_Trip/ant5 (Small).jpg", text4: "and of course, a boba tea was a must!", 
                            photo5: "Photos/Belgium/Antwerp/Belgium_Trip/ant2 (Small).mp4", text5: "And a bunch of crazy guys <br>pedaling a beer bike down the street?</br>" 
                        },
                        { 
                            title:"Plantin-Moretus Museum", 
                            photo1: "Photos/Belgium/Antwerp/Belgium_Trip/ant6 (Small).jpg", text1: "<br>Another UNESCO site, </br>the only fully preserved 16th-century printing house in the world!", 
                            photo2: "Photos/Belgium/Antwerp/Belgium_Trip/ant7 (Small).jpg", text2: "They demonstrated 16th-century printing, and visitors could bring home a souvenir:)", 
                            photo3: "Photos/Belgium/Antwerp/Belgium_Trip/ant8 (Small).jpg", 
                            photo4: "Photos/Belgium/Antwerp/Belgium_Trip/ant9 (Small).jpg", text4: "See how the <span style='font-size:1.5em; font-weight:bold; color: #A32020;'>movable type printing</span> looks like",
                            photo5: "Photos/Belgium/Antwerp/Belgium_Trip/ant10 (Small).jpg", 
                        },
                        { 
                            photo: "Photos/Belgium/Antwerp/Belgium_Trip/ant11 (Small).jpg", text: "I was so surpraised at <br>how deep the escalator went down to a subway station!</br>" 
                        },
                        { 
                            title:"Het Steen", 
                            photo: "Photos/Belgium/Antwerp/Belgium_Trip/ant12 (Small).jpg", text1: "An Antwerp's oldest building, <br>originally a medieval fortress by the Scheldt River. </br>Today, it stands as a symbol of the city's history.", 
                                                                    text2: "Sadly, we came too late to visit..." 
                        },
                        { 
                            photo: "Photos/Belgium/Antwerp/Belgium_Trip/ant13 (Small).jpg", 
                            text: "Behold, the <span style='font-size:1.5em; font-weight:bold; color: #A32020;'>unrivaled river view!</span>" 
                        },
                        { 
                            title:"Grote Markt", 
                            photo1: "Photos/Belgium/Antwerp/Belgium_Trip/ant14 (Small).jpg", text1: "Here stands the City Hall,", 
                            photo2: "Photos/Belgium/Antwerp/Belgium_Trip/ant15 (Small).jpg", text2: "the Guild Houses,", 
                            photo3: "Photos/Belgium/Antwerp/Belgium_Trip/ant3 (Small).mp4", 
                            photo4: "Photos/Belgium/Antwerp/Belgium_Trip/ant16 (Small).jpg", text4: "where we enjoyed our JAPANESE dinner just right there!!" 
                        },
                        { 
                            photo1: "Photos/Belgium/Antwerp/Belgium_Trip/ant4 (Small).mp4", text1: "Looks even more fabulous at night, <br>the Antwerp Central Station!</br>",
                            photo2: "Photos/Belgium/Antwerp/Belgium_Trip/ant17 (Small).jpg", 
                        },
                    ]
                },
                { id: "betrip2", city: "Leuven", date: "2023-09-30", img: "", labelOffset: { x: 2, y: -0.5 }, stay: "Overnight in Leuven", link: "", linkText: "" },
                { id: "betrip2", city: "Leuven", date: "2023-10-01", img: "", labelOffset: { x: 2, y: -0.5 }, stay: "Overnight in Leuven", link: "", linkText: "" },
                {
                    id: "betrip2",
                    city: "Leuven",
                    date: "2023-10-01",
                    type: "waypoint",
                    link: "Belgium.html",
                    labelOffset: { x: 2, y: -0.5 },
                    desc: "University Town",
                    notes: [
                        { 
                            photo: "Photos/Belgium/Leuven/Belgium_Trip/leu1 (Small).jpg", text: "On the banner wrote <span style='font-size:1.5em; font-weight:bold; color: #A32020;'>'STUDENT WELCOME LEUVEN'</span><br>, while we were on the contrary heading to the church</br>" 
                        },
                        { 
                            photo1: "Photos/Belgium/Leuven/Belgium_Trip/leu2 (Small).jpg", text1: "Attending a service at the Chinese Church that my friend frequents,", 
                            photo2: "Photos/Belgium/Leuven/Belgium_Trip/leu3 (Small).jpg", text2:"and had a <span style='font-size:1.5em; font-weight:bold; color: #A32020;'>FEAST of SASHIMI</span> afterwards!!!" 
                        },
                        { 
                            title: "Town Hall", 
                            photo: "Photos/Belgium/Leuven/Belgium_Trip/leu4 (Small).jpg", text: "How elegant it is, right?" 
                        },
                        { 
                            title: "Saint Peter's Church", 
                            photo: "Photos/Belgium/Leuven/Belgium_Trip/leu5 (Small).jpg", text: "Gothic white! not sure if this color even exists :)" 
                        },
                        { 
                            photo: "Photos/Belgium/Leuven/Belgium_Trip/leu6 (Small).jpg", text: "Spotted an activity that was perhaps named 'Duck Racing?'" 
                        },
                        { 
                            title: "Sint-Antoniuskapel", 
                            photo1: "Photos/Belgium/Leuven/Belgium_Trip/leu7 (Small).jpg", text1: "Here is where Pater Damiaan was laid", 
                            photo2: "Photos/Belgium/Leuven/Belgium_Trip/leu8 (Small).jpg", 
                        },
                        { 
                            title: "Groot Begijnhof", 
                            photo: "Photos/Belgium/Leuven/Belgium_Trip/leu9 (Small).JPEG", text: "Now this UNESCO Heritage is transformed into KU Leuven" 
                        },
                    ]
                },
                { id: "betrip2", city: "Leuven", date: "2023-10-01", img: "", labelOffset: { x: 2, y: -0.5 }, stay: "Overnight in Leuven", link: "", linkText: "" },
                { id: "betrip2", city: "Leuven", date: "2023-10-02", img: "", labelOffset: { x: 2, y: -0.5 }, stay: "Overnight in Leuven", link: "", linkText: "" },
                { 
                    id: "betrip4", 
                    city: "Bruges", 
                    date: "2023-10-02", 
                    type: "waypoint",
                    link: "Belgium.html",
                    labelOffset: { x: -1.5, y: -0.5 },
                    desc: "Authentic Medieval Town",
                    notes: [
                        { 
                            title: "Minnewaterpark", 
                            photo1: "Photos/Belgium/Bruges/Belgium_Trip/bg1 (Small).jpg", text1: "Way into town", 
                            photo2: "Photos/Belgium/Bruges/Belgium_Trip/bg2 (Small).jpg", text2: "Full of surprise along the way! Canels and Brick houses~~",
                            photo3: "Photos/Belgium/Bruges/Belgium_Trip/bg3 (Small).jpg", 
                        },
                        { 
                            photo: "Photos/Belgium/Bruges/Belgium_Trip/bg1 (Small).mp4", text: "See the hand-cranked instrument. <br>That is super creative and cool!</br>" 
                        },
                        { 
                            photo: "Photos/Belgium/Bruges/Belgium_Trip/bg4 (Small).jpg", text: "We should take the cruise..."
                        },
                        { 
                            title: "Church of Our Lady", 
                            photo1: "Photos/Belgium/Bruges/Belgium_Trip/bg5 (Small).jpg", text1: "An old church nestling besides a medieval bridge", 
                            photo2: "Photos/Belgium/Bruges/Belgium_Trip/bg6 (Small).jpg", text2: "This combination was a real fantasy!!",
                            photo3: "Photos/Belgium/Bruges/Belgium_Trip/bg7 (Small).JPEG", 
                        },
                        { 
                            title: "Huisbrouwerij De Halve Maan", 
                            photo1: "Photos/Belgium/Bruges/Belgium_Trip/bg8 (Small).jpg", text1: "Brewery visit was for sure a must!", 
                            photo2: "Photos/Belgium/Bruges/Belgium_Trip/bg9 (Small).jpg", 
                            photo3: "Photos/Belgium/Bruges/Belgium_Trip/bg10 (Small).jpg", text3: "And last but not least: beer & Belgium cuisine:)"
                        },
                        { 
                            title: "Sint-Salvatorskathedraal", 
                            photo1: "Photos/Belgium/Bruges/Belgium_Trip/bg11 (Small).jpg", text1: "I think this is the main Cathedral in Bruges, so definately had to take a visit haha",
                            photo2: "Photos/Belgium/Bruges/Belgium_Trip/bg12 (Small).jpg", 
                            photo3: "Photos/Belgium/Bruges/Belgium_Trip/bg13 (Small).jpg", 
                        },
                        { 
                            title: "Markt", 
                            photo1: "Photos/Belgium/Bruges/Belgium_Trip/bg14 (Small).jpg", text1: "Amazing square, especially the bell tower of the town hall...", 
                            photo2: "Photos/Belgium/Bruges/Belgium_Trip/bg2 (Small).mp4", text2: "How can this be built so high up to the sky?!"
                        },
                        { 
                            title: "Belfry", 
                            photo1: "Photos/Belgium/Bruges/Belgium_Trip/bg15 (Small).jpg", text1: "But the bell tower seems like Minas Morgul in LOTR?", 
                                                                                           text2: "Sadly we didn't have chance to go up"
                        },
                        { 
                            title:"City Hall", 
                            photo1: "Photos/Belgium/Bruges/Belgium_Trip/bg16 (Small).jpg", text1: "Then we moved to the town hall, which was richly decorated inside.", 
                            photo2: "Photos/Belgium/Bruges/Belgium_Trip/bg17 (Small).jpg", text2: "I could imagine somehow the wealthiness back then ><",
                            photo3: "Photos/Belgium/Bruges/Belgium_Trip/bg18 (Small).jpg", 
                        },
                        { 
                            title: "Basilica of the Holy Blood", 
                            photo1: "Photos/Belgium/Bruges/Belgium_Trip/bg19 (Small).JPEG", text1: "A seems-to-be famous catholic church, which we didn't know why ><",
                            photo2: "Photos/Belgium/Bruges/Belgium_Trip/bg3 (Small).mp4", 
                        },
                        { 
                            photo1: "Photos/Belgium/Bruges/Belgium_Trip/bg20 (Small).jpg", text1: "Of course a picturisque photo with me as a proof", 
                            photo2: "Photos/Belgium/Bruges/Belgium_Trip/bg21 (Small).jpg", text2: "And as it went darker, prettier it became", 
                            photo3: "Photos/Belgium/Bruges/Belgium_Trip/bg22 (Small).jpg", text3: "No wonder it's my favorite town in Belgium!!"
                        },
                    ]
                },
                { id: "betrip4", city: "Bruges", date: "2023-10-02", img: "", labelOffset: { x: -1.5, y: -0.5 }, stay: "Overnight in Bruges", link: "", linkText: "" },
                { id: "betrip4", city: "Bruges", date: "2023-10-03", img: "", labelOffset: { x: -1.5, y: -0.5 }, stay: "Overnight in Bruges", link: "", linkText: "" },
                {
                    id: "betrip5",
                    city: "Ghent",
                    date: "2023-10-03",
                    type: "waypoint",
                    link: "Belgium.html",
                    labelOffset: { x: -1.8, y: 1.2 },
                    desc: "Belfry and Castle",
                    notes: [
                        { 
                            title: "Saint Nicholas' Church", 
                            photo1: "Photos/Belgium/Ghent/Belgium_Trip/gh1 (Small).jpg", text1: "Ghent was in my opinion not as pretty as Bruges,", 
                            photo2: "Photos/Belgium/Ghent/Belgium_Trip/gh2 (Small).JPEG", text2: "perhaps it's because the modern buildings and the cloudy weather?!", 
                            photo3: "Photos/Belgium/Ghent/Belgium_Trip/gh3 (Small).jpg", 
                            photo4: "Photos/Belgium/Ghent/Belgium_Trip/gh4 (Small).JPEG", 
                        },
                        { 
                            title: "Belfort van Gent", 
                            photo1: "Photos/Belgium/Ghent/Belgium_Trip/gh5 (Small).jpg", text1: "First stop was the iconic belfry, with a crazy spatious ground floor~~", 
                            photo2: "Photos/Belgium/Ghent/Belgium_Trip/gh6 (Small).jpg", text2: "An old illustration/Map of Ghent", 
                            photo3: "Photos/Belgium/Ghent/Belgium_Trip/gh7 (Small).jpg", text3: "This is the fire dragon that protects Ghent for centeries!", 
                            photo4: "Photos/Belgium/Ghent/Belgium_Trip/gh8 (Small).jpg", text4: "How narrow the stair was!", 
                            photo5: "Photos/Belgium/Ghent/Belgium_Trip/gh9 (Small).jpg", text5: "but rewarded the unbeatable view!", 
                            photo6: "Photos/Belgium/Ghent/Belgium_Trip/gh1 (Small).mp4", text6: "See how the bells work~~", 
                            photo7: "Photos/Belgium/Ghent/Belgium_Trip/gh10 (Small).JPEG", text7: "And me and the Belfry^^"
                        },
                        { 
                            title: "Saint Bavo's Cathedral", 
                            photo1: "Photos/Belgium/Ghent/Belgium_Trip/gh11 (Small).JPEG", text1: "There were so many churches along the same streets", 
                            photo2: "Photos/Belgium/Ghent/Belgium_Trip/gh12 (Small).JPEG", text2: "Don't know why but imposing :)", 
                            photo3: "Photos/Belgium/Ghent/Belgium_Trip/gh13 (Small).JPEG", text3: "The modern stained glass windows was refreshing!"
                        },
                        { 
                            title: "De Post", 
                            photo: "Photos/Belgium/Ghent/Belgium_Trip/gh30 (Small).jpg", text: "Now this elegant Post was transformed into a shopping area" 
                        },
                        { 
                            photo: "Photos/Belgium/Ghent/Belgium_Trip/gh14 (Small).JPEG", text1: "Lunch Time! Fresh Mussel cooked with white wine and garlic<span style='font-size:0.5em'>, and a cheese burger</span>!", 
                                                                    text2: "Mmmmm... Tasty~~" 
                                                                },
                        { 
                            title: "Castle of the Counts", 
                            photo1: "Photos/Belgium/Ghent/Belgium_Trip/gh15 (Small).JPEG", text1: "And now came my favorite: Castle!!", 
                            photo2: "Photos/Belgium/Ghent/Belgium_Trip/gh16 (Small).JPEG", text2: "Both from water and land are the castle awe-inspiring!", 
                            photo3: "Photos/Belgium/Ghent/Belgium_Trip/gh17 (Small).JPEG", text3: "Crossbow is my favorite cold weapon in video games haha", 
                            photo4: "Photos/Belgium/Ghent/Belgium_Trip/gh18 (Small).JPEG", text4: "Don't miss the Rooftop. So scenic!", 
                            photo5: "Photos/Belgium/Ghent/Belgium_Trip/gh19 (Small).JPEG", text5: "But also accompanied by the notorious torture room...", 
                            photo6: "Photos/Belgium/Ghent/Belgium_Trip/gh20 (Small).JPEG", text6: "A resevoir or a storage. I'm always attracted by something underground(?!", 
                            photo7: "Photos/Belgium/Ghent/Belgium_Trip/gh21 (Small).JPEG", text7: "Last glimpse :)"
                        },
                        { 
                            title:"Graslei and Korenlei", 
                            photo1: "Photos/Belgium/Ghent/Belgium_Trip/gh22 (Small).JPEG", text1: "And then the river cruise set sail!", 
                            photo2: "Photos/Belgium/Ghent/Belgium_Trip/gh23 (Small).JPEG", text2: "Along the river stand well-preserved historic buildings!", 
                            photo3: "Photos/Belgium/Ghent/Belgium_Trip/gh24 (Small).JPEG", text3: "And the weather finally became better^^", 
                            photo4: "Photos/Belgium/Ghent/Belgium_Trip/gh25 (Small).JPEG", text4: "Say Cheeeeeese~~", 
                            photo5: "Photos/Belgium/Ghent/Belgium_Trip/gh26 (Small).JPEG", text5: "And an ancient Tor closed our journey"
                        },
                        { 
                            title:"Saint Michael's Church", 
                            photo: "Photos/Belgium/Ghent/Belgium_Trip/gh27 (Small).JPEG", text: "Sadly it was already closed when we arrived..."
                        },
                        { 
                            photo1: "Photos/Belgium/Ghent/Belgium_Trip/gh28 (Small).JPEG", text1: "Let's enjoy the last golden glory of old!", 
                            photo2: "Photos/Belgium/Ghent/Belgium_Trip/gh29 (Small).JPEG", 
                        },
                    ]
                },
                { id: "betrip2", city: "Leuven", date: "2023-10-03", img: "", labelOffset: { x: 2, y: -0.5 }, stay: "Overnight in Leuven", link: "", linkText: "" },
                { id: "betrip2", city: "Leuven", date: "2023-10-04", img: "", labelOffset: { x: 2, y: -0.5 }, stay: "Overnight in Leuven", link: "", linkText: "" },
                {
                    id: "betrip2",
                    city: "Leuven",
                    date: "2023-10-04",
                    type: "waypoint",
                    link: "Belgium.html",
                    labelOffset: { x: 2, y: -0.5 },
                    desc: "University Town",
                    notes: [
                        { 
                            title:"Park Abbey", 
                            photo1: "Photos/Belgium/Leuven/Belgium_Trip/leu10 (Small).JPEG", text1: "Strollong in the countryside before setting off to the airport><", 
                            photo2: "Photos/Belgium/Leuven/Belgium_Trip/leu11 (Small).JPEG", 
                            photo3: "Photos/Belgium/Leuven/Belgium_Trip/leu1 (Small).mp4", text3:"Ducks were also strolling! Mmmmm...yummy(XX)"
                        },
                    ]
                },
                { id: "housePoint1", date: "2023-10-04", type: "end",city: "Munich", labelOffset: { x: 2, y: 0 }},
            ]
        },
        // Paris New Year Trip
        // {
        //     date:'2023-12-24<br>2024-01-07', text:'Paris New Year Trip', countryCandidates:['fr','de'], home: ['housePoint1'],
        //     markerIds: ['housePoint1', 'dePoint1', 'dePoint2', 'dePoint3', 'frtrip1', 'frtrip2'],
        //     eventMarkers: [
        //         { id: "housePoint1", date: "2023-12-24", city: "Munich (Start)", desc: "Visited a Weihnachtsmarkt and Attended Chinese Church Service with 張綱" },
        //         { id: "housePoint1", date: "2023-12-25", city: "Munich (Start)", desc: "Showed 張綱 around Munich and had a Christmas Feast at 彥文安得's home" },
        //         { id: "housePoint1", date: "2023-12-26", city: "Munich", desc: "Guided 張綱 to Nymphenburg Palace and Bavarian National Museum, dined at Hofbräuhaus" },
        //         { id: "dePoint1", date: "2023-12-27", city: "Schwangau", desc: "Travelled with 阿德、張綱、凱淇 to Neuschwanstein by car" },
        //         { id: "housePoint1", date: "2023-12-28", city: "Munich", desc: "Guided 張綱 to Residenz" },
        //         { id: "housePoint1", date: "2023-12-29", city: "Munich", desc: "Dined at Zitronegras" },
        //         { id: "frtrip1", date: "2023-12-29", city: "Paris", desc: "Flied to Paris with 張綱" },
        //         { id: "frtrip1", date: "2023-12-30", city: "Paris", desc: "Met 悅聆 & at Panthéon. In the evening watched a live play of Notre-Dame de Paris" },
        //         { id: "frtrip1", date: "2023-12-31", city: "Paris", desc: "Together visited Petit Palais, Jardin des Tuileries, enjoyed dinner before Celebrating New Year in front of Arc de Triomphe" },
        //         { id: "frtrip1", date: "2024-01-01", city: "Paris", desc: "Visited Basilique du Sacré-Cœur, Arc de Triomphe, Eiffel Tower, and passed by Notre-Dame with 張綱" },
        //         { id: "frtrip2", date: "2024-01-02", city: "Versailles", desc: "Travelled to visit Versailles while I got a terrible flu" },
        //         { id: "frtrip1", date: "2024-01-03", city: "Paris", desc: "Visited The Louvre the whole day without finishing it" },
        //         { id: "frtrip1", date: "2024-01-04", city: "Paris", desc: "Visited Musée de l’Orangerie and Musée d’Orsay" },
        //         { id: "frtrip1", date: "2024-01-05", city: "Paris", desc: "Took a Seine River Cruise" },
        //         { id: "dePoint2", date: "2024-01-05", city: "Mannheim", desc: "Travelled by train to Mannheim, where 張綱 lived" },
        //         { id: "dePoint3", date: "2024-01-06", city: "Heidelberg", desc: "Visited Heidelberg Castle with 張綱" },
        //         { id: "dePoint2", date: "2024-01-07", city: "Mannheim", desc: "Attended Sunday Service at a Chinese Church, where 張綱 belongs" },
        //         { id: "housePoint1", date: "2024-01-07", city: "Munich (End)", desc: "Travelled back to Munich by Train" },
        //     ]
        // },
        // {date:'2024-11-18', text:'Nürnberg Trip', countryCandidates:['de']},
        // {date:'2024-12-07', text:'Regensburg Trip', countryCandidates:['de']},
        // {date:'2024-12-21', text:'Baden-Württemberg Trip', countryCandidates:['de']},
    ],
    markers: {
        home: [
            { id: "housePoint1", x: 311, y: 357, city: "Munich", center: [48.1351, 11.5820], img: "Photos/Germany/Munich/muc18 (Small).jpg", desc: "目前的居住地，啤酒節與豬腳。", pins: [
                {
                    loc: [48.3536, 11.7832], date:"2023-09-18", t: "Munich Airport (MUC)", ot: "24/7", tp: "Free", v: 1, w: "https://www.munich-airport.com/",
                    photo1: "Photos/Germany/Munich/muc1 (Small).mp4", text1: "The Landing & the First Sunrise of my Adventure in Europe.",
                    photo2: "Photos/Germany/Munich/muc2 (Small).mp4",
                    photo3: "Photos/Germany/Munich/muc1 (Small).jpg", text3: "The Landlords, also my former colleague's sister, welcomed me with a Deutsch breakfast :)"
                },
                {
                    loc: [48.1754, 11.5520], date:"2023-09-18", t: "Olympiapark", p:"Photos/Munich/muc3.jpg", ot: "24/7", tp: "Free", v: 1, w: "https://www.olympiapark.de/en",
                    photo1: "Photos/Germany/Munich/muc2 (Small).jpg", text1: "Morning run, thanks to jet lag",
                    photo2: "Photos/Germany/Munich/muc3 (Small).jpg",
                    photo3: "Photos/Germany/Munich/muc4 (Small).jpg", text3: "and did some pull-ups :)"
                },
                {
                    loc: [48.1403, 11.5645], date:"2023-09-19", t: "Justizpalast", p:"Photos/Munich/muc6.jpg", ot: "Sun <span style='color: #A32020;'>Closed</span><br>Mon 08:00-15:00<br>Tue 08:00-15:00<br>Wed 08:00-15:00<br>Thu 08:00-15:00<br>Fri 08:00-<span style='color: #A32020;'>14:00</span><br>Sat <span style='color: #A32020;'>Closed</span>", tp: "Free", v: 1, w: "https://www.muenchen.de/en/sights/karlstor-stachus",
                    photo1: "Photos/Germany/Munich/muc5 (Small).jpg", text1: "This is the atrium of the courthouse",
                    photo2: "Photos/Germany/Munich/muc6 (Small).jpg", text2: "Here were the White Rose members tried during WWII.",
                },
                {
                    loc: [48.1390, 11.5668], date:"2023-09-19", t: "Karlstor", p:"Photos/Munich/muc7.jpg", ot: "24/7", tp: "Free", v: 1, w: "https://www.muenchen.de/en/sights/karlstor-stachus",
                    photo1: "Photos/Germany/Munich/muc7 (Small).jpg", text1: "The main gate to Munich old town",
                },
                {
                    loc: [48.1387, 11.5703], date:"2023-09-19", t: "St. Michael Munich", p:"Photos/Munich/muc8.jpg", ot: "Sun 07:30-<span style='color: #A32020;'>22:00</span><br>Mon <span style='color: #A32020;'>09:30</span>-19:00<br>Tue 07:30-19:00<br>Wed 07:30-19:00<br>Thu 07:30-19:00<br>Fri <span style='color: #A32020;'>09:30</span>-19:00<br>Sat 07:30-19:00", tp: "Free", v: 1, w: "https://www.st-michael-muenchen.de/en/gottesdienst/service/opening-hours",
                    photo1: "Photos/Germany/Munich/muc8 (Small).jpg", text1: "The main gate to Munich old town",
                },
                {
                    loc: [48.1387, 11.5730], date:"2023-09-19", t: "Frauenkirche", p:"Photos/Munich/muc9.jpg", ot: "Sun 08:00-20:00<br>Mon 08:00-20:00<br>Tue 08:00-20:00<br>Wed 08:00-20:00<br>Thu 08:00-20:00<br>Fri 08:00-20:00<br>Sat 08:00-20:00", tp: "Church:Free<br>Tower:7.5€", v: 1, w: "https://www.muenchner-dom.de/",
                    photo1: "Photos/Germany/Munich/muc9 (Small).jpg", text1: "So magnificent it was from this corner!",
                    photo2: "Photos/Germany/Munich/muc10 (Small).jpg", text2: "But the interior was actually not the surprising...",
                    photo3: "Photos/Germany/Munich/muc11 (Small).jpg", text3: "Up to the south tower by Elevator(?",
                    photo4: "Photos/Germany/Munich/muc12 (Small).jpg",
                    photo5: "Photos/Germany/Munich/muc13 (Small).jpg", text5: "Final glimpse",
                },
                {
                    loc: [48.1375, 11.5759], date:"2023-09-19", t: "New Town Hall", p:"Photos/Munich/muc14.jpg", ot: "Not open to the public except tours", tp: "Adults:28<br>Atudent:25€", v: 1, w: "https://www.munich.travel/en/offers/booking/guided-tour-of-the-historic-town-hall-incl.-the-law-library#/",
                    photo1: "Photos/Germany/Munich/muc14 (Small).jpg", text1: "The facade was amayinglz detailed!",
                    photo2: "Photos/Germany/Munich/muc15 (Small).jpg", text2: "and inside was like in Hogwarts (but it is not free anymore...)",
                    photo3: "Photos/Germany/Munich/muc16 (Small).jpg",
                },
                {
                    loc: [48.1372, 11.5755], date:"2023-09-19", t: "Marienplatz", p:"Photos/Munich/muc18.jpg", ot: "24/7", tp: "Free", v: 1, w: "https://www.muenchen.de/en/sights/attractions/marienplatz-munichs-old-town",
                    photo1: "Photos/Germany/Munich/muc17 (Small).jpg", text1: "A sight from the tower of Frauenkirche",
                    photo2: "Photos/Germany/Munich/muc18 (Small).jpg", text2: "A sight from the tower of St. Peter Church",
                    photo3: "Photos/Germany/Munich/muc3 (Small).mp4", text3:"and a video^^"
                },
                {
                    loc: [48.1362, 11.5773], date:"2023-09-19", t: "Heilig Geist", p:"Photos/Munich/muc19.jpg", ot: "Sun <span style='color: #A32020;'>08:30</span>-20:00<br>Mon 09:00-20:00<br>Tue 09:00-20:00<br>Wed 09:00-20:00<br>Thu 09:00-20:00<br>Fri 09:00-20:00<br>Sat <span style='color: #A32020;'>08:30</span>-20:00", tp: "Free", v: 1, w: "https://heilig-geist-muenchen.de/",
                    photo1: "Photos/Germany/Munich/muc19 (Small).jpg", text1: "I really like the pink paint inside the church:)",
                },
                {
                    loc: [48.1365, 11.5760], date:"2023-09-19", t: "St. Peter", winter:"Nov-Mar", summer:"Apr-Oct", otw: "Sun 09:00-<span style='color: #A32020;'>19:30</span><br>Mon 09:00-18:30<br>Tue 09:00-18:30<br>Wed 09:00-18:30<br>Thu 09:00-18:30<br>Fri 09:00-18:30<br>Sat 09:00-<span style='color: #A32020;'>19:30</span>", ots: "Sun 09:00-19:30<br>Mon 09:00-19:30<br>Tue 09:00-19:30<br>Wed 09:00-19:30<br>Thu 09:00-19:30<br>Fri 09:00-19:30<br>Sat 09:00-19:30", tp: "Church:Free<br>Tower Adults:5€<br>Tower Student:3€", v: 1, w: "https://alterpeter.de/",
                    photo1: "Photos/Germany/Munich/muc4 (Small).mp4", text1: "A long way up... but worth it!!",
                    photo2: "Photos/Germany/Munich/muc20 (Small).jpg", text2: "A postcard background, a must to come up!",
                },
                {
                    loc: [48.1368, 11.5770], date:"2023-09-19", t: "Old Town Hall", p:"Photos/Munich/muc21.jpg", ot: "Sun 10:00-17:30<br>Mon 10:00-17:30<br>Tue <span style='color: #A32020;'>Closed</span><br>Wed 10:00-17:30<br>Thu 10:00-17:30<br>Fri 10:00-17:30<br>Sat 10:00-17:30", tp: "8€", v: 1, w: "https://www.spielzeugmuseummuenchen.de/en/admission-eintrittspreise-spielzeugmuseum",
                    photo1: "Photos/Germany/Munich/muc21 (Small).jpg", text1: "The building itself is now atoy museum, and looks newer than the old town hall haha",
                },
                {
                    loc: [48.1376, 11.5797], date:"2023-09-19", t: "Hofbräuhaus München", ot: "Sun 11:00-00:00<br>Mon 11:00-00:00<br>Tue 11:00-00:00<br>Wed 11:00-00:00<br>Thu 11:00-00:00<br>Fri 11:00-00:00<br>Sat 11:00-00:00", tp: "It's a restaurant!", v: 1, w: "https://www.hofbraeuhaus.de/en/",
                    photo1: "Photos/Germany/Munich/muc22 (Small).jpg", text1: "Call of the day with a Bavarian Beer! Prost!",
                },
                {
                    loc: [48.1583, 11.5033], date:"2023-09-20", t: "Nymphenburg Palace", winter:"Oct-Mar", summer:"Apr-Oct", otw: "Sun 10:00-16:00<br>Mon 10:00-16:00<br>Tue 10:00-16:00<br>Wed 10:00-16:00<br>Thu 10:00-16:00<br>Fri 10:00-16:00<br>Sat 10:00-16:00", ots: "Sun 09:00-18:00<br>Mon 09:00-18:00<br>Tue 09:00-18:00<br>Wed 09:00-18:00<br>Thu 09:00-18:00<br>Fri 09:00-18:00<br>Sat 09:00-18:00", tp: "Adults:10€<br>Student:9€", v: 1, w: "https://www.schloss-nymphenburg.de/englisch/tourist/admiss.htm",
                    photo1: "Photos/Germany/Munich/muc23 (Small).jpg", text1: "As a summer palace, an imposing and elegant white front was quite impressing!",
                    photo2: "Photos/Germany/Munich/muc24 (Small).jpg", text2: "This is the main hall!",
                    photo3: "Photos/Germany/Munich/muc24 (Small).jpg", text3: "and one of the old paintings dipicting its past",
                    photo4: "Photos/Germany/Munich/muc5 (Small).mp4", text4: "The most renownd room: Gallery of Beauties",
                },
                {
                    loc: [48.1567, 11.5048], date:"2023-09-20", t: "Marstallmuseum", winter:"Oct-Mar", summer:"Apr-Oct", otw: "Sun 10:00-16:00<br>Mon 10:00-16:00<br>Tue 10:00-16:00<br>Wed 10:00-16:00<br>Thu 10:00-16:00<br>Fri 10:00-16:00<br>Sat 10:00-16:00", ots: "Sun 09:00-18:00<br>Mon 09:00-18:00<br>Tue 09:00-18:00<br>Wed 09:00-18:00<br>Thu 09:00-18:00<br>Fri 09:00-18:00<br>Sat 09:00-18:00", tp: "Adults:8€<br>Student:7€", v: 1, w: "https://www.schloss-nymphenburg.de/englisch/tourist/admiss.htm",
                    photo1: "Photos/Germany/Munich/muc26 (Small).jpg", text1: "I didn't expect a royal carriage can be so sophisticated...",
                    photo2: "Photos/Germany/Munich/muc27 (Small).jpg", text2: "This is a type of slegde, but more...aristocratic",
                    photo3: "Photos/Germany/Munich/muc28 (Small).jpg",
                    photo4: "Photos/Germany/Munich/muc29 (Small).jpg",
                    photo5: "Photos/Germany/Munich/muc6 (Small).mp4", text5: "Here are some modern carriages,also really fancy!",
                    photo6: "Photos/Germany/Munich/muc30 (Small).jpg", text6: "On the first floor displays some collections of royal porcelain",
                    photo7: "Photos/Germany/Munich/muc31 (Small).jpg", text7: "This Blue fascinated me!",
                    photo8: "Photos/Germany/Munich/muc32 (Small).jpg", text8: "Souvenir of the past :)",
                    photo9: "Photos/Germany/Munich/muc33 (Small).jpg", text9: "and was greatly astonisched by these flowers. They were made of clay!!!",
                },
                {
                    loc: [48.1562, 11.5003], date:"2023-09-20", t: "Park palaces", winter:"Oct-Mar", summer:"Apr-Oct", otw: "<span style='color: #A32020;'>Closed</span>", ots: "Sun 09:00-18:00<br>Mon 09:00-18:00<br>Tue 09:00-18:00<br>Wed 09:00-18:00<br>Thu 09:00-18:00<br>Fri 09:00-18:00<br>Sat 09:00-18:00", tp: "Adults: 6€<br>Student: 5€", v: 1, w: "https://nymphenburg.bsv-ticketshop.de/en",
                    photo1: "Photos/Germany/Munich/muc34 (Small).jpg", text1: "There are in total 4 palaces to visit. But I only had time for 2 of them><",
                    photo2: "Photos/Germany/Munich/muc35 (Small).jpg", text2: "This is Pagodenburg, featured with tiles and ceramic",
                    photo3: "Photos/Germany/Munich/muc36 (Small).jpg", text3: "This is Badenburg, featured with a real bath in it!",
                    photo4: "Photos/Germany/Munich/muc37 (Small).jpg", text4: "One can also notice there are many Chinese elements~",
                    photo5: "Photos/Germany/Munich/muc7 (Small).mp4",
                },
                {
                    loc: [48.1578, 11.4923], date:"2023-09-20", t: "Palace Park", winter:"Oct-Mar", summer:"Apr-Oct", otw: "Sun 06:00-18:00<br>Mon 06:00-18:00<br>Tue 06:00-18:00<br>Wed 06:00-18:00<br>Thu 06:00-18:00<br>Fri 06:00-18:00<br>Sat 06:00-18:00", ots: "Sun 06:00-21:30<br>Mon 06:00-21:30<br>Tue 06:00-21:30<br>Wed 06:00-21:30<br>Thu 06:00-21:30<br>Fri 06:00-21:30<br>Sat 06:00-21:30", tp: "Free", v: 1, note:"The opening hours in Apr & Oct: 06:00-20:00<br>", w: "https://nymphenburg.bsv-ticketshop.de/en",
                    photo1: "Photos/Germany/Munich/muc38 (Small).jpg", text1: "And the amazingly idyllic park!",
                    photo2: "Photos/Germany/Munich/muc39 (Small).jpg", text2: "Park, Palace, and goose~~",
                    photo3: "Photos/Germany/Munich/muc40 (Small).jpg", text3: "Every view were born to be a painting",
                    photo4: "Photos/Germany/Munich/muc41 (Small).jpg", 
                    photo5: "Photos/Germany/Munich/muc42 (Small).jpg", 
                    photo6: "Photos/Germany/Munich/muc43 (Small).jpg", text6: "Hidden Pavillion",
                    photo7: "Photos/Germany/Munich/muc44 (Small).jpg", text7: "Nymphenburg in the afternoon",
                },
                {
                    loc: [48.1398, 11.5788], date:"2023-09-21", t: "Bavarian State Opera", ot: "Depending on the performance", tp: "Depending on the performance", v: 1, w: "https://www.staatsoper.de/en/visit",
                    photo1: "Photos/Germany/Munich/muc45 (Small).jpg", text1: "Just passed by, but it is quite imposing",
                },
                {
                    loc: [48.1405, 11.5789], date:"2023-09-21", t: "Munich Residence", winter:"Oct-Mar", summer:"Apr-Oct", otw: "Sun 10:00-17:00<br>Mon 10:00-17:00<br>Tue 10:00-17:00<br>Wed 10:00-17:00<br>Thu 10:00-17:00<br>Fri 10:00-17:00<br>Sat 10:00-17:00", ots: "Sun 09:00-18:00<br>Mon 09:00-18:00<br>Tue 09:00-18:00<br>Wed 09:00-18:00<br>Thu 09:00-18:00<br>Fri 09:00-18:00<br>Sat 09:00-18:00", tp: "Adults:10€<br>Student:9€", v: 1, w: "https://resmue.bsv-ticketshop.de/en",
                    photo1: "Photos/Germany/Munich/muc46 (Small).jpg", text1: "Here is where the Bavaria Royal Family once lived. and this is the Portico",
                    photo2: "Photos/Germany/Munich/muc47 (Small).jpg", text2: "This hallway was the entrance for important guests",
                    photo3: "Photos/Germany/Munich/muc48 (Small).jpg",
                    photo4: "Photos/Germany/Munich/muc49 (Small).jpg", text4: "A part of the model",
                    photo5: "Photos/Germany/Munich/muc50 (Small).jpg", text5: "An weird piano",
                    photo6: "Photos/Germany/Munich/muc51 (Small).jpg", text6: "I like this elevated steps, seems so formal and mysterious ><",
                    photo7: "Photos/Germany/Munich/muc52 (Small).jpg", text7: "and there were a bunch of tepestries all over every single wall!",
                    photo8: "Photos/Germany/Munich/muc53 (Small).jpg", text8: "Hall of Mirrors, a smaller copy of the one in Versaille",
                    photo9: "Photos/Germany/Munich/muc54 (Small).jpg", text9: "Don't know why the Royals fensed themselves while sleeping(?",
                    photo10: "Photos/Germany/Munich/muc55 (Small).jpg", text10: "Porcelain Room. Notice how sophisticated the chandelier is!",
                    photo11: "Photos/Germany/Munich/muc56 (Small).jpg", text11: "An interesting armchair with the motif Chinese",
                    photo12: "Photos/Germany/Munich/muc8 (Small).mp4", text12: "The stairway hall, evoking the grandeur of the Pantheon",
                    photo13: "Photos/Germany/Munich/muc57 (Small).jpg", text13: "As I remember, this was a first antechamber to the throne room",
                    photo14: "Photos/Germany/Munich/muc58 (Small).jpg", text14: "and the second antechamber, which is more splendid",
                    photo15: "Photos/Germany/Munich/muc59 (Small).jpg", text15: "something in between(?",
                    photo16: "Photos/Germany/Munich/muc60 (Small).jpg", text16: "and finally the throne room!",
                    photo17: "Photos/Germany/Munich/muc61 (Small).jpg", text17: "Let's go outside~ actually the exterior is much more boring...",
                },
                {loc:[48.1381, 11.5855], t:"Hofbräuhaus", d:"Bavarian Tradition"},
                {loc:[48.1448, 11.5793], t:"English Garden", d:"Urban Surfing Spot"}, 
                {loc:[48.1769, 11.5583], t:"BMW Museum", d:"Ultimate Craftsmanship"}
            ]},
            { id: "housePoint2", x: 350, y: 355, city: "Vienna", date: "2023-11-12", img: "", desc: "音樂之都。", link: "", linkText: "" },
            { id: "housePoint3", x: 328, y: 321, city: "Dresden", center: [51.0504, 13.7373], desc:"歷史悠久的文化重鎮。", pins: [
                {loc:[51.053, 13.735], t:"Frauenkirche", d:"Symbol of peace"},
                {loc:[51.052, 13.733], t:"Zwinger", d:"Baroque architecture"}
            ]},
            { id: "housePoint4", x: 275, y: 308, city: "Enschede", date: "2024-05-18", img:"", desc:"荷蘭邊境的大學城。", link:"", linkText:"" }
        ],
        de: [
            { id:"dePoint1", x: 305, y: 365, city: "Schwangau", center: [47.5758, 10.7491], desc: "Lands of Fairytale Castles", pins: [
                {loc:[47.5576, 10.7498], t:"Neuschwanstein Castle", d:"The fairytale inspiration"},
                {loc:[47.5558, 10.7360], t:"Hohenschwangau Castle", d:"Royal residence"}
            ]},
            { id:"dePoint2", x: 286, y: 342, city: "Mannheim", center: [49.4875, 8.4660], desc: "University Town with iconic Water Storage Tower", pins: [
                {loc:[49.4836, 8.4763], t:"Wasserturm", d:"Historic water tower"},
                {loc:[49.4828, 8.4631], t:"University of Mannheim", d:"Baroque palace campus"}
            ]},
            { id:"dePoint3", x: 288, y: 343, city: "Heidelberg", center: [49.3988, 8.6724], desc: "Fantastic and Breathtaking Valley Landscape", pins: [
                {loc:[49.4106, 8.7153], t:"Heidelberg Castle", d:"Renaissance ruins"},
                {loc:[49.4120, 8.7100], t:"Old Bridge", d:"Iconic stone bridge"}
            ]},
            { id:"dePoint4", x: 310, y: 356, city: "Dachau", center: [48.2630, 11.4330], desc: "Concentration Camp model", pins: [
                {date: "2023-10-06", loc:[48.2701, 11.4681], t:"Dachau Memorial", d:"Historical site", trip:"Day Trip: Dachau Concentration Camp"}
            ]},
            { id:"berlin", city: "Berlin", center: [52.5200, 13.4050], desc: "The intersection of historical scars and avant-garde art.", pins: [
                {loc:[52.5163, 13.3777], t:"Brandenburg Gate", d:"Historical Center"}, 
                {loc:[52.5186, 13.3761], t:"Reichstag Building", d:"Transparent Political Structure"},
                {loc:[52.5075, 13.3903], t:"Checkpoint Charlie", d:"Cold War Memory"}
            ]}
        ],
        at: [
            { id:"atPoint1", x: 324.3, y: 362.3, city: "Salzburg", date: "2023-10-14", img: "", desc: "A town of Mozart and romantic castle", link: "https://en.wikipedia.org/wiki/Salzburg", linkText: "more" },
        ],
        be: [
            { id: "betrip1", x: 255, y: 324, city: "Brussels", center: [50.8503, 4.3517], img: "Photos/Belgium/Brussels/Belgium_Trip/bru8 (Small).jpg", date: "2023-09-29", desc: "The Capital of Belgium", link: "https://en.wikipedia.org/wiki/Brussels", linkText: "more", pins: [
                {loc:[50.8478, 4.3601], t:"Cathedral of St. Michael and St. Gudula", p:"Photos/Belgium/Brussels/Belgium_Trip/bru3 (Small).JPEG", ot: "Sun <span style='color: #A32020;'>13:00</span>-18:00<br>Mon 08:00-18:00<br>Tue 08:00-18:00<br>Wed 08:00-18:00<br>Thu 08:00-18:00<br>Fri 08:00-18:00<br>Sat 08:00-<span style='color: #A32020;'>17:00</span>", tp:"Free", v: 1, d: "A supreme place where the Kings and Queens are crowned", w:"https://cathedralisbruxellensis.be/en/visit/"},
                {loc:[50.8478, 4.3550], t:"Royal Saint-Hubert Galleries", p:"Photos/Belgium/Brussels/Belgium_Trip/bru4 (Small).JPEG", ot: "24/7", tp:"Free", v: 1, d: "Elegant shopping arcade perfect for Belgium waffle", w:"https://www.grsh.be/en/home/"},
                {loc:[50.8466, 4.3519], t:"Brussels City Hall", p:"Photos/Belgium/Brussels/Belgium_Trip/bru8 (Small).jpg", ot: "Sun 11:00-17:00<br>Mon 11:00-17:00<br>Tue <span style='color: #A32020;'>Closed</span><br>Wed 11:00-17:00<br>Thu <span style='color: #A32020;'>Closed</span><br>Fri <span style='color: #A32020;'>15:00-19:00</span><br>Sat <span style='color: #A32020;'>15:00-19:00</span>", tp:"Adult: 15€<br>Student:8€", v: 1, d: "Stunning Gothic building on the Grand-Place", w:"https://www.brussels.be/city-hall"},
                {loc:[50.8471, 4.3528], t:"Brussels City Museum", p:"Photos/Belgium/Brussels/Belgium_Trip/bru12 (Small).jpg", ot: "Sun 10:00-17:00<br>Mon <span style='color: #A32020;'>Closed</span><br>Tue 10:00-17:00<br>Wed 10:00-17:00<br>Thu 10:00-17:00<br>Fri 10:00-17:00<br>Sat 10:00-17:00", tp:"Adults: 10€<br>Student:5€", v: 1, d: "Houses the original Manneken Pis", w:"https://www.brusselscitymuseum.brussels/en/your-visit/pratical-details"},
                {loc:[50.8419, 4.3582], t:"Royal Museums of Fine Arts of Belgium", p:"Photos/Belgium/Brussels/Belgium_Trip/bru18 (Small).jpg", ot: "Sun <span style='color: #A32020;'>11:00-18:00</span><br>Mon <span style='color: #A32020;'>Closed</span><br>Tue 10:00-17:00<br>Wed 10:00-17:00<br>Thu 10:00-17:00<br>Fri 10:00-17:00<br>Sat <span style='color: #A32020;'>11:00-18:00</span>", tp:"Adults: 10€<br>19-26:3€", v: 1, d: "World-famous gallery with great spatial variation", w:"https://fine-arts-museum.be/en/visit/planning-my-visit/admission-prices"},
                {loc:[50.8404, 4.3561], t:"Church of Our Lady of Victories at the Sablon", p:"Photos/Belgium/Brussels/Belgium_Trip/bru21 (Small).jpg", ot: "Sun <span style='color: #A32020;'>09:00-18:00</span><br>Mon 10:00-18:00<br>Tue 10:00-18:00<br>Wed 10:00-18:00<br>Thu 10:00-18:00<br>Fri 10:00-18:00<br>Sat <span style='color: #A32020;'>09:00-18:00</span>", tp:"Free", v: 1, d: "Beautiful church with magnificently high nave", w:"https://en.fondsamiseglisesablon.be/"},
                {loc:[50.8451, 4.3634], t:"Parc de Bruxelles", p:"Photos/Belgium/Brussels/Belgium_Trip/bru23 (Small).jpg", ot: "24/7", tp:"Free", v: 1, d: "A relaxing park with a glimmering fountain", w:"https://gardens.brussels/fr/espaces-verts/parc-de-bruxelles"},
                {loc:[50.8467, 4.3525], t:"Grand-Place", p:"Photos/Belgium/Brussels/Belgium_Trip/bru7 (Small).jpg", ot: "24/7", tp:"Free", v:1, d:"Opulent central square", w:"https://www.brussels.be/grand-place-brussels"},
                {loc:[50.8450, 4.3499], t:"Manneken Pis", p:"Photos/Belgium/Brussels/Belgium_Trip/bru14 (Small).jpg", ot: "24/7", tp:"Free", v:1, d:"Iconic bronze fountain sculpture", w:"https://www.brussel.be/manneken-pis"},
                {loc:[50.8420, 4.3621], t:"Royal Palace of Brussels", p:"Photos/Belgium/Brussels/Belgium_Trip/bru22 (Small).jpg", ot: "Closed until further notice", tp:"X", v:1, d:"Official palace of the King and Queen", w:"https://www.monarchie.be/nl/patrimonium/koninklijk-paleis-te-brussel"},
                {loc:[50.8949, 4.3415], t:"Atomium", ot: "Sun 10:00-18:00<br>Mon 10:00-18:00<br>Tue 10:00-18:00<br>Wed 10:00-18:00<br>Thu 10:00-18:00<br>Fri 10:00-18:00<br>Sat 10:00-18:00", tp:"Adults:17€<br>Student:9€", v:0, d:"Futuristic steel building", w:"https://www.atomium.be/atomium-price"},
            ]},
            { id: "betrip2", x: 258.5, y: 323.5, city: "Leuven", center: [50.8798, 4.7005], img: "Photos/Belgium/Leuven/Belgium_Trip/leu4 (Small).jpg", date: "2023-09-29", desc: "University Town", link: "https://en.wikipedia.org/wiki/Leuven", linkText: "more", pins: [
                {loc:[50.8787, 4.7011], t:"Town Hall", p:"Photos/Belgium/Leuven/Belgium_Trip/leu4 (Small).jpg", ot: "Sun 10:00-17:00<br>Mon 10:00-17:00<br>Tue 10:00-17:00<br>Wed 10:00-17:00<br>Thu 10:00-17:00<br>Fri 10:00-17:00<br>Sat 10:00-17:00", tp:"Not for visiting", v: 1, d:"Stunning Gothic architecture", w:"https://visitleuven.be/stadhuis"},
                {loc:[50.8796, 4.7012], t:"St. Peter's Church", p:"Photos/Belgium/Brussels/Belgium_Trip/leu5 (Small).jpg", ot: "Sun <span style='color: #A32020;'>11:00</span>-16:30<br>Mon 10:00-16:30<br>Tue 10:00-16:30<br>Wed 10:00-16:30<br>Thu 10:00-16:30<br>Fri 10:00-16:30<br>Sat 10:00-16:30", tp:"Free", v: 1, d:"Late Gothic church on the Grote Markt", w:"https://www.visitleuven.be/sint-pieterskerk#plan-je-bezoek"},
                {loc:[50.8700, 4.6966], t:"Groot Begijnhof", p:"Photos/Belgium/Brussels/Belgium_Trip/leu9 (Small).JPEG", ot:"24/7", tp:"Free", v: 1, d:"Historical beguinage, UNESCO site. Now served as student dorms", w: "https://www.visitleuven.be/groot-begijnhof#plan-je-bezoek"},
                {loc: [50.8760, 4.6983], t: "Sint-Antoniuskapel", p:"Photos/Belgium/Brussels/Belgium_Trip/leu8 (Small).jpg", ot: "Sun 9:00-18:00<br>Mon 9:00-18:00<br>Tue 9:00-18:00<br>Wed 9:00-18:00<br>Thu 9:00-18:00<br>Fri 9:00-18:00<br>Sat 9:00-18:00", tp:"Free", v: 1, d: "The final resting place of Father Damien", w:"https://visitleuven.be/sint-antoniuskapel"},
                {loc: [50.8644, 4.7180], t: "Park Abbey", p:"Photos/Belgium/Brussels/Belgium_Trip/leu11 (Small).JPEG", ot:"24/7", tp:"Free", v: 2, d: "One of the best-preserved 12th-century abbey complexes in Belgium.", w:"https://www.abdijvanpark.be/en/opening-hours-and-closing-days"}
            ]},
            { id: "betrip3", x: 255.5, y: 319, city: "Antwerp", center: [51.2194, 4.4025], img: "Photos/Belgium/Antwerp/Belgium_Trip/ant15 (Small).jpg", date: "2023-09-30", desc: "Remarkable Railway Station", link: "https://en.wikipedia.org/wiki/Antwerp", linkText: "more", pins: [
                {loc:[51.2172, 4.4214], t:"Antwerpen-Centraal", p:"Photos/Belgium/Antwerp/Belgium_Trip/ant17 (Small).jpg", ot: "Sun 05:45-22:00<br>Mon 05:45-22:00<br>Tue 05:45-22:00<br>Wed 05:45-22:00<br>Thu 05:45-22:00<br>Fri 05:45-22:00<br>Sat 05:45-22:00", tp: "Free", v:1, d:"Beautiful railway station architecture", w: "https://www.belgiantrain.be/nl/station-information/antwerpen/antwerpen-centraal"},
                {loc:[51.2213, 4.3996], t:"Cathedral of Our Lady", ot: "Sun <span style='color: #A32020;'>13:00</span>-17:00<br>Mon 10:00-17:00<br>Tue 10:00-17:00<br>Wed 10:00-17:00<br>Thu 10:00-17:00<br>Fri 10:00-17:00<br>Sat 10:00-<span style='color: #A32020;'>15:00</span>", tp:"Adults:12€<br>Student:10€", v:0, d:"Gothic cathedral with Rubens paintings", w:"https://www.dekathedraal.be/en/visit"},
                {loc:[51.2227, 4.3973], t:"Het Steen", p:"Photos/Belgium/Brussels/Belgium_Trip/ant12 (Small).jpg", ot: "Sun 10:00-18:00<br>Mon 10:00-18:00<br>Tue 10:00-18:00<br>Wed 10:00-18:00<br>Thu 10:00-18:00<br>Fri 10:00-18:00<br>Sat 10:00-18:00", tp:"7€", v:1, d:"Medieval fortress in the city center", w:"https://visit.antwerpen.be/het-steen"},
                {loc: [51.2180, 4.4097], t: "Meir Shopping Street", p:"Photos/Belgium/Brussels/Belgium_Trip/ant4 (Small).jpg", ot:"24/7", tp:"Free", v: 1, d: "A chill walking street connecting the central station to the harbour", w:"https://visit.antwerpen.be/en/shopping-zone-meir"},
                {loc: [51.2185, 4.3983], t: "Plantin-Moretus Museum", p:"Photos/Belgium/Brussels/Belgium_Trip/ant6 (Small).jpg", ot: "Sun 10:00-17:00<br>Mon <span style='color: #A32020;'>Closed</span><br>Tue 10:00-17:00<br>Wed 10:00-17:00<br>Thu 10:00-17:00<br>Fri 10:00-17:00<br>Sat 10:00-17:00", tp:"Adults:12€<br>18-25:8€", v: 1, d: "The only fully preserved 16th-century printing house (UNESCO site)", w:"https://www.museumplantinmoretus.be/de/ihr-besuch"},
                {loc: [51.2214, 4.3995], t: "Grote Markt", ot:"24/7", tp:"Free", v: 1, d: "Iconic square with City Hall, Guild Houses, and the Brabo Fountain", w:"https://visit.antwerpen.be/grote-markt"},
                {loc: [51.21687, 4.40999], t: "Rubenshuis", ot: "Sun 10:00-<span style='color: #A32020;'>18:00</span><br>Mon 10:00-17:00<br>Tue 10:00-17:00<br>Wed <span style='color: #A32020;'>Closed</span><br>Thu 10:00-17:00<br>Fri 10:00-17:00<br>Sat 10:00-<span style='color: #A32020;'>18:00</span>", tp: "Adult:12€<br>18-25:8€", v: 0, d: "The former home and studio of Peter Paul Rubens.", w: "https://visit.rubenshuis.be/#/tickets/combi"},
                {loc: [51.20881, 4.39481], t: "KMSKA - Royal Museum of Fine Arts", ot: "Mon 10:00-17:00<br>Tue 10:00-17:00<br>Wed 10:00-17:00<br>Thu 10:00-<span style='color: #A32020;'>22:00</span><br>Fri 10:00-17:00<br>Sat 10:00-<span style='color: #A32020;'>18:00</span><br>Sun 10:00-<span style='color: #A32020;'>18:00</span>", tp: "Adult:20€<br>18-26:10€", v: 0, d: "A grand neoclassical museum featuring Flemish masters.", w: "https://kmska.be/en/opening-hours-and-tickets"}
            ]},
            { id: "betrip4", x: 247, y: 319, city: "Bruges", center: [51.2093, 3.2247], img: "Photos/Belgium/Bruges/Belgium_Trip/bg14 (Small).jpg", date: "2023-10-02", desc: "Venice in the North", link: "https://en.wikipedia.org/wiki/Bruges", linkText: "more", pins: [
                {loc: [51.2047, 3.2245], t: "Church of Our Lady", p:"Photos/Belgium/Bruges/Belgium_Trip/bg7 (Small).JPEG", ot: "Sun <span style='color: #A32020;'>13:30-17:00</span><br>Mon 09:30-17:00<br>Tue 09:30-17:00<br>Wed 09:30-17:00<br>Thu 09:30-17:00<br>Fri 09:30-17:00<br>Sat 09:30-17:00", tp:"Free", v: 1, d: "An old church nestling besides a medieval bridge", w:"https://www.flemishmastersinsitu.com/en/venues/church-our-lady-brugge"},
                {loc: [51.2024, 3.2243], t: "Huisbrouwerij De Halve Maan", p:"Photos/Belgium/Brussels/Belgium_Trip/bg10 (Small).jpg", ot:"Please check the timeslots on the website", tp:"Classic: 16€<br>XL tour: 26€", v: 1, d: "Brewery visit was for sure a must! Beer & Belgium cuisine", w:"https://www.halvemaan.be/en/visit/brewery"},
                {loc: [51.2055, 3.2217], t: "Sint-Salvatorskathedraal", p:"Photos/Belgium/Brussels/Belgium_Trip/bg11 (Small).jpg", ot: "Sun <span style='color: #A32020;'>14:00-17:00</span><br>Mon 10:00-17:30<br>Tue 10:00-17:30<br>Wed 10:00-17:30<br>Thu 10:00-17:30<br>Fri 10:00-17:30<br>Sat 10:00-15:30", tp:"Free", v: 1, d: "The main Cathedral in Bruges", w:"https://www.sintsalvatorskathedraal.be/#"},
                {loc: [51.2086, 3.2244], t: "Markt", p:"Photos/Belgium/Brussels/Belgium_Trip/bg14 (Small).jpg", ot:"24/7", tp:"Free", v: 1, d: "Amazing square with the iconic bell tower", w:"https://www.visitbruges.be/en/things-to-do/culture-and-heritage/markt-market-square"},
                {loc: [51.2083, 3.2248], t: "Belfry", p:"Photos/Belgium/Brussels/Belgium_Trip/bg15 (Small).jpg", summer:"Apr-Oct", winter:"Nov-Mar", ots: "Sun 09:00-20:00<br>Mon 09:00-20:00<br>Tue 09:00-20:00<br>Wed 09:00-20:00<br>Thu 09:00-20:00<br>Fri 09:00-20:00<br>Sat 09:00-20:00", otw: "Sun 10:00-18:00<br>Mon 10:00-18:00<br>Tue 10:00-18:00<br>Wed 10:00-18:00<br>Thu 10:00-18:00<br>Fri 10:00-18:00<br>Sat <span style='color: #A32020;'>09:00-20:00</span>", tps:"16€", tpw:"15€", v: 1, d: "A medieval bell tower with 366 steps, offering panoramic city views and housing a 47-bell carillon.", w:"https://www.museabrugge.be/en/visit/locations/belfort"},
                {loc: [51.2082, 3.2266], t: "City Hall", p:"Photos/Belgium/Brussels/Belgium_Trip/bg16 (Small).jpg", ot: "Sun 09:30-17:00<br>Mon 09:30-17:00<br>Tue 09:30-17:00<br>Wed 09:30-17:00<br>Thu 09:30-17:00<br>Fri 09:30-17:00<br>Sat 09:30-17:00", tp:"Adults:8€<br>18-25:7€", v: 1, d: "Richly decorated inside, reflecting the wealthiness back then", w:"https://www.museabrugge.be/en/visit/locations/stadhuis"},
                {loc: [51.2082, 3.2268], t: "Basilica of the Holy Blood", p:"Photos/Belgium/Brussels/Belgium_Trip/bg19 (Small).JPEG", ot: "Sun 10:00-17:15<br>Mon 10:00-17:15<br>Tue 10:00-17:15<br>Wed 10:00-17:15<br>Thu 10:00-17:15<br>Fri 10:00-17:15<br>Sat 10:00-17:15", tp: "Free", v: 1, d: "A famous catholic church on the Burg square", w:"https://www.holyblood.com/homepage-of-the-basilica-of-the-holy-blood"},
                {loc: [51.1996, 3.2255], t: "Minnewaterpark", p:"Photos/Belgium/Brussels/Belgium_Trip/bg1 (Small).jpg", ot:"24/7", tp:"Free", v: 1, d:"Romantic park with a 'Lake of Love'", w:"https://www.visitbruges.be/en/things-to-do/culture-and-heritage/minnewaterpark-lake-love-park"},
            ]},
            { id: "betrip5", x: 251, y: 321, city: "Ghent", center: [51.0543, 3.7174], img: "Photos/Belgium/Ghent/Belgium_Trip/gh28 (Small).JPEG", date: "2023-10-03", desc: "Ghent Belfry and Castle surrounded by Water", link: "https://en.wikipedia.org/wiki/Ghent", linkText: "more", pins: [
                {loc: [51.0539, 3.7230], t: "Saint Nicholas' Church", p:"Photos/Belgium/Ghent/Belgium_Trip/gh2 (Small).JPEG", ot: "Sun 10:00-16:00<br>Mon 10:00-16:00<br>Tue 10:00-16:00<br>Wed 10:00-16:00<br>Thu 10:00-16:00<br>Fri 10:00-16:00<br>Sat 10:00-16:00", tp: "Free", v: 1, d: "An iconic church in the heart of Ghent", w:"https://www.sintniklaaskerk.be/"},
                {loc: [51.0537, 3.7248], t: "Belfort van Gent", p:"Photos/Belgium/Brussels/Belgium_Trip/gh7 (Small).jpg", ot: "Sun 10:00-17:30<br>Mon 10:00-17:30<br>Tue 10:00-17:30<br>Wed 10:00-17:30<br>Thu 10:00-17:30<br>Fri 10:00-17:30<br>Sat 10:00-17:30", tp: "Adults: 13€<br>19-25:6.5€", v: 1, d: "Iconic belfry guarded by a fire dragon for centuries, with unbeatable views", w:"https://historischehuizen.stad.gent/en/belfry/visit/individual-visit"},
                {loc: [51.0530, 3.7268], t: "Saint Bavo's Cathedral", p:"Photos/Belgium/Brussels/Belgium_Trip/gh12 (Small).JPEG", ot: "Sun <span style='color: #A32020;'>13:00</span>-17:30<br>Mon 08:30-17:30<br>Tue 08:30-17:30<br>Wed 08:30-17:30<br>Thu 08:30-17:30<br>Fri 08:30-17:30<br>Sat 08:30-17:30", tp: "Free", v: 1, d: "Imposing cathedral featuring refreshing modern stained glass windows", w:"https://www.sintbaafskathedraal.be/en/practical/opening-hours/"},
                {loc: [51.0571, 3.7208], t: "Castle of the Counts", p:"Photos/Belgium/Brussels/Belgium_Trip/gh15 (Small).JPEG", ot: "Sun 10:00-18:00<br>Mon 10:00-18:00<br>Tue 10:00-18:00<br>Wed 10:00-18:00<br>Thu 10:00-18:00<br>Fri 10:00-18:00<br>Sat 10:00-18:00", tp: "Adults: 15€<br>19-25:7.5€", v: 1, d: "Awe-inspiring medieval castle featuring a notorious torture room and scenic rooftop", w:"https://historischehuizen.stad.gent/en/gravensteen/bezoek/plan-je-bezoek/information-prices"},
                {loc: [51.0536, 3.7195], t: "Saint Michael's Church", p:"Photos/Belgium/Brussels/Belgium_Trip/gh27 (Small).JPEG", summer:"Apr-Oct", winter:"Nov-Mar", ots: "Sun 14:00-17:00<br>Mon <span style='color: #A32020;'>Closed</span><br>Tue 14:00-17:00<br>Wed 14:00-17:00<br>Thu 14:00-17:00<br>Fri 14:00-17:00<br>Sat 14:00-17:00", otw:"Sun Closed<br>Mon Closed<br>Tue Closed<br>Wed Closed<br>Thu Closed<br>Fri Closed<br>Sat Closed", tps: "Free", tpw: "Free", v: 1, d: "A majestic church by the river (sadly closed when we arrived)", w:"https://mkgent.be/kerk/st-michaels-church/"},
                {loc: [51.0546, 3.7204], t: "Graslei and Korenlei", p:"Photos/Belgium/Brussels/Belgium_Trip/gh24 (Small).JPEG", ot:"24/7", tp:"Free", v: 1, d:"Scenic quays along the Leie river", w:"https://visit.gent.be/en/see-do/history-graslei-and-korenlei"},
                {loc: [51.0543, 3.7216], t: "De Post", p: "Photos/Belgium/Brussels/Belgium_Trip/gh30 (Small).jpg", ot: "Sun <span style='color: #A32020;'>12:00</span>-18:00<br>Mon 10:00-18:00<br>Tue 10:00-18:00<br>Wed 10:00-18:00<br>Thu 10:00-18:00<br>Fri 10:00-<span style='color: #A32020;'>18:30</span><br>Sat 10:00-<span style='color: #A32020;'>18:30</span>", tp: "Free", v: 1, d: "A stunning former post office transformed into a luxury shopping center and hotel, perfectly blending neo-Gothic grandeur with modern lifestyle.", w: "https://depostgent.be/"}
            ]}
        ],
        fr: [
            { id: "frtrip1", x: 239, y: 346, city: "Paris", date: "2023-12-29", img: "paris.jpg", desc: "The Capital of France", link: "https://en.wikipedia.org/wiki/Paris", linkText: "more" },
            { id: "frtrip2", x: 237, y: 347, city: "Versailles", date: "2024-01-02", img: "versailles.jpg", desc: "The Splendor of France", link: "https://en.wikipedia.org/wiki/Versailles,_Yvelines", linkText: "more" },
        ],
        pl: [
            { id:"plPoint1", x: 380, y: 307, city: "Wroclaw", date: "2024-04-12", img: "", desc: "小矮人的城市。", link: "", linkText: "" },
            { id:"plPoint2", x: 400, y: 287, city: "Warsaw", date: "2024-04-15", img: "", desc: "浴火重生的鳳凰城。", link: "", linkText: "" }
        ],
    }
};