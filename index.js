const user = {
  name: "sanojjonas",
  artist: {
    liked: [
      {
        name: "B R I Q U E V I L L E",
        id: "d2d3c29c-27bf-40c1-bf3e-c04eeb61750f"
      },
      {
        name: "The Love",
        id: "067fa2c0-f8de-4f21-b35e-7ffcecd01444"
      },
      {
        name: "Millionaire",
        id: "f52e7937-8237-477a-9ec5-f4fa0cb7a124"
      },
      {
        name: "Mojo & The Kitchen Brothers",
        id: "f29f6197-cb2a-4d2d-b6d8-66f7102b5ff5"
      },
      {
        name: "Personal Trainer",
        id: "2e84443c-dc23-4b65-922a-f96b8a73d602"
      },
      {
        name: "Queens Of The Stone Age",
        id: "7dc8f5bd-9d0b-4087-9f73-dc164950bbd8"
      },
      {
        name: "Raketkanon",
        id: "f821e2e6-7da9-4066-8b8a-f5a76002a290"
      },
      {
        name: "The Rones",
        id: "9314867f-0707-4efb-a72f-de01ac0bf6c2"
      },
      {
        name: "STEVE",
        id: "38aceca0-03c4-4c9f-94c3-721a9e6f86cf"
      }
    ]
  },
  event: {
    liked: [
      {
        name: "Absolutely Free Festival 2023",
        id: "bf78ec4e-1a6e-4f95-9fab-daac17813adc"
      },
      {
        name: "Jera On Air 2024",
        id: "65414726-18dc-4a79-99ad-b61f35076337"
      },
      {
        name: "Rock Herk 1983",
        id: "5f125929-4c29-40ea-99b6-9fd4691c2938"
      },
      {
        name: "Rock Herk 1985",
        id: "1a7b3b42-24cb-4186-b4eb-0ef0cf915095"
      },
      {
        name: "Rock Herk 2001",
        id: "69b79ed1-8240-4a4f-8b90-91fe090042d9"
      },
      {
        name: "Rock Herk 2008",
        id: "0c8f8d08-ab16-42b8-af39-f09f590f05f7"
      },
      {
        name: "Rock Herk 2023",
        id: "0be24bbb-67b2-4299-888b-71ffd86fd827"
      },
      {
        name: "Rock Herk 2024",
        id: "186ad33b-74ad-40a6-9df0-afc31c5cd6f3"
      }
    ]
  },
  series: {
    liked: [
      {
        name: "Rock Herk",
        id: "d47425e5-2706-4b3d-91d6-dbd5abd08494"
      },
      {
        name: "Absolutely Free Festival",
        id: "62e32667-1bdc-497b-a859-17d9192d60b7"
      }
    ]
  }
}

let busy = false;
let count = 0;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function load() {
  changeButtons("artist");
}

function updateText(div, text) {
  document.getElementById(div).innerHTML = text
}

function changeButtons(type) {
  let buttons = "";
  buttons += `<button id="fetch" onclick="changeButtons('artist')">favorites artists</button>`;
  buttons += `<button id="fetch" onclick="changeButtons('event')">favorites events</button>`;
  buttons += `<button id="fetch" onclick="changeButtons('serie')">favorites series</button>`;
  switch (type) {
    case "artist":
      itemList("artist", user.artist.liked, "left")
      break;
    case "event":
      itemList("event", user.event.liked, "left")
      break;
    case "serie":
      itemList("series", user.series.liked, "left")
      break;
    default:
      console.log("do nothing for this button");
  }
  updateText("buttons", buttons);
}

function move(from, to) {
  document.getElementById(to).innerHTML = document.getElementById(from).innerHTML;
  updateText("right", "");
  updateText("right2", "");
}

function itemList(type, list, div) {
  const sortedList = list.sort((a, b) => a.name.localeCompare(b.name));
  let items = "";
  for (let i = 0; i < sortedList.length; i++) {
    items += `<button id="fetch" onclick="grabStuff('${type}','${sortedList[i].id}',false,'right')">fetch</button>`;
    items += `<button id="full" onclick="grabStuff('${type}','${sortedList[i].id}',true,'right')">full</button>`;
    items += ` ${sortedList[i].name}<br>`;
  }
  updateText(div, items);
}

async function fetchMusicBrainz(type, id, includes) {
  const speed = 1000;
  let musicbrainzUrl = "";
  if (includes) {
    musicbrainzUrl = `https://musicbrainz.org/ws/2/${type}/${id}?inc=aliases+${includes}&fmt=json`;
  } else {
    musicbrainzUrl = `https://musicbrainz.org/ws/2/${type}/${id}?inc=aliases+artist-rels+event-rels+place-rels&fmt=json`;
  }
  let data = await fetch(musicbrainzUrl);
  await sleep(speed);
  if (!data.ok) {
    console.log(musicbrainzUrl);
    throw new Error('woepsedaisy');
  }
  let json = await data.json()
  count += 1;
  updateText("load", count);
  return json
}

function checkLifeSpan(oldLifeSpan) {
  //make numbers from values (removes months)
  let lifeSpan = oldLifeSpan;
  let numberLifeSpan = {};
  if (lifeSpan.begin === null) {
    numberLifeSpan.begin = 0;
  } else if (lifeSpan.begin.split("-")[1]) {
    numberLifeSpan.begin = +lifeSpan.begin.split("-")[0];
  } else {
    numberLifeSpan.begin = +lifeSpan.begin;
  }
  if (lifeSpan.end === null) {
    numberLifeSpan.end = 0;
  } else if (lifeSpan.end.split("-")[1]) {
    numberLifeSpan.end = +lifeSpan.end.split("-")[0];
  } else {
    numberLifeSpan.end = +lifeSpan.end;
  }
  numberLifeSpan.ended = lifeSpan.ended;

  const yearNow = new Date().getFullYear();
  //change 0 to current year
  let newLifeSpan = {};
  if (numberLifeSpan.ended === false) {
    if (numberLifeSpan.begin === 0) {
      newLifeSpan.begin = yearNow;
    } else {
      newLifeSpan.begin = numberLifeSpan.begin;
    }
    if (numberLifeSpan.end === 0 && numberLifeSpan.ended === false) {
      newLifeSpan.end = yearNow;
    } else {
      newLifeSpan.end = numberLifeSpan.end;
    }
    newLifeSpan.ended = numberLifeSpan.ended;
  } else {
    newLifeSpan = numberLifeSpan;
  }
  return newLifeSpan;
}

function getValues(item) {
  let newItem = {}
  let instrument = []
  if (item.name) {
    newItem = item
  }
  else if (item.artist) {
    newItem = item.artist;
    if (item.attributes.length > 0) {
      for (let i = 0; i < item.attributes.length; i++) {
        instrument.push({
          name: item.attributes[i],
          lifeSpan: checkLifeSpan({
            begin: item.begin,
            end: item.end,
            ended: item.ended
          })
        })
      }
    }
  }
  else if (item.event) {
    newItem = item.event;
  }
  else if (item.place) {
    newItem = item.place;
  }
  else {
    console.log(item);
    throw new Error("add more types in get value")
  }

  const json = {
    name: newItem.name,
    id: newItem.id,
    type: item.type,
    lifeSpan: {},
    child: {
      artist: [],
      event: [],
      instrument: [],
      member: [],
      other: [],
    },
    parent: {
      artist: [],
      event: [],
      series: [],
      other: []
    }
  }

  if (instrument.length > 0) {
    json.child.instrument = instrument;
  } else {
    if (newItem['life-span']) {
      json.lifeSpan = checkLifeSpan(newItem['life-span'])
    } else {
      json.lifeSpan = checkLifeSpan({
        begin: item.begin,
        end: item.end,
        ended: item.ended
      })
    }
  }
  return json;
}

function sortItems(item, json) {
  const relation = item.relations;
  for (let i = 0; i < relation.length; i++) {
    const itemValue = getValues(relation[i]);
    if ((relation[i].type == "founder"
      || relation[i].type == "member of band"
      || relation[i].type == "instrumental supporting musician")
      && relation[i].direction == "backward") {
      //child member
      const double = json.child.member.findIndex(a => a.id === itemValue.id);
      if (double > -1) {
        for (let j = 0; j < itemValue.child.instrument.length; j++) {
          json.child.member[double].child.instrument.push(itemValue.child.instrument[j]);
        }
      } else {
        json.child.member.push(itemValue);
      }
    }
    else if ((relation[i].type == "founder"
      || relation[i].type == "member of band"
      || relation[i].type == "instrumental supporting musician"
      || relation[i].type == "is person"
      || relation[i].type == "supporting musician"
      || relation[i].type == "collaboration"
      || relation[i].type == "host")
      && relation[i].direction == "forward") {
      //parent artist (of member)
      json.parent.artist.push(itemValue);
    }
    else if ((relation[i].type == "main performer")
      && relation[i].direction == "backward") {
      //child artist (from event)
      json.child.artist.push(itemValue);
    }
    else if (relation[i].type == "married"
      || relation[i].type == "sibling"
      || relation[i].type == "parent"
      || relation[i].type == "involved with") {
      //familie
      //console.log("do nothing for familie");
    }
    else if ((relation[i].type == "subgroup"
      || relation[i].type == "tribute")
      && relation[i].direction == "backward") {
      //child artist (from other artist)
      json.child.artist.push(getValues(relation[i]));
    }
    else if ((relation[i].type == "main performer"
      || relation[i].type == "support act"
      || relation[i].type == "guest performer"
      || relation[i].type == "tribute to")
      && relation[i].direction == "forward") {
      //event parent (of member)
      json.parent.event.push(getValues(relation[i]));
    }
    else if ((relation[i].type == "parts")
      && relation[i].direction == "backward") {
      //event parent (of other event)
      json.parent.event.push(getValues(relation[i]));
    }
    else if ((relation[i].type == "parts")
      && relation[i].direction == "forward") {
      //event child (of other event)
      json.child.event.push(getValues(relation[i]));
    }
    else if ((relation[i].type == "engineer position"
      || relation[i].type == "held at")
      && relation[i].direction == "forward") {
      //place parent
      json.parent.other.push(itemValue);
    }
    else {
      console.log(relation[i]);
      throw new Error("incorrect type/direction");
    }
  }
  return json
}

async function checkDeeper(type, json) {
  const deeperJson = json.child;
  switch (type) {
    case "event":
      if (deeperJson.event.length > 0) {
        for (let i = 0; i < deeperJson.event.length; i++) {
          const event = deeperJson.event[i];
          const eventItem = await fetchMusicBrainz("event", event.id)
          deeperJson.event[i] = sortItems(eventItem, deeperJson.event[i]);
          await checkDeeper("event", deeperJson.event[i]);
        }
      }
      break;
    case "member":
      if (deeperJson.member.length > 0) {
        for (let i = 0; i < deeperJson.member.length; i++) {
          const member = deeperJson.member[i];
          const memberItem = await fetchMusicBrainz("artist", member.id)
          deeperJson.member[i] = sortItems(memberItem, deeperJson.member[i]);
        }
      }
      break;
    default:
      throw new Error("add more deeper checker");
  }
}

async function grabStuff(type, id, full) {
  if (busy === false) {
    busy = true;
    count = 0;
    updateText("right", "");
    updateText("right2", "");
    let json = {}
    const item = await fetchMusicBrainz(type, id);
    json = sortItems(item, getValues(item, json));

    if (full === true) {
      switch (type) {
        case "artist":
          await checkDeeper("member", json);
          generateMemberArtistList(json);
          generateMemberInstrumentTable(json);
          break;
        case "event":
          await checkDeeper("event", json);
          generateEventList(json, [], []);
          break;
        default:
          throw new Error("add extra full get stuff");
      }
    }
    else {
      switch (type) {
        case "artist":
          generateMemberInstrumentTable(json);
          break;
        case "event":
          throw new Error("event fetch get stuff");
          break;
        default:
          throw new Error("add extra fetch get stuff");
      }
    }

    count += ` done`;
    updateText("load", count);
    //console.log(json);
    busy = false;
  } else {
    console.log("do nothing when busy");
  }
}

function generateMemberArtistList(json) {
  console.log(json)
  let list = [];
  if (json.child.member.length > 0) {
    const member = json.child.member;
    for (let i = 0; i < member.length; i++) {
      if (member[i].parent.artist.length > 0) {
        const artist = member[i].parent.artist;
        for (let j = 0; j < artist.length; j++) {
          const double = list.findIndex(a => a.id === artist[j].id);
          if (double > -1) {
            //console.log("do nothing for doubles" + artist[j].name);
          }
          else {
            list.push({ name: artist[j].name, id: artist[j].id })
          }
        }
      }
    }
  }
  itemList("artist", list, "right");
}

function generateEventList(json, eventList, artistList) {
  console.log(json)
  if (json.child.artist.length > 0) {
    const artistChild = json.child.artist;
    for (let j = 0; j < artistChild.length; j++) {
      artistList.push({ name: artistChild[j].name, id: artistChild[j].id })
    }
  }
  if (json.child.event.length > 0) {
    const eventChild = json.child.event;
    for (let i = 0; i < eventChild.length; i++) {
      eventList.push({ name: eventChild[i].name, id: eventChild[i].id });
      generateEventList(eventChild[i], eventList, artistList);
    }
  }

  itemList("event", eventList, "right");
  itemList("artist", artistList, "right2");
}
function sortInstruments(json) {
  const artistInstrument = json.child.instrument;
  if (json.child.member.length > 0) {
    const member = json.child.member;
    for (let i = 0; i < member.length; i++) {
      if (member[i].child.instrument.length > 0) {
        const memberInstrument = member[i].child.instrument;
        for (let j = 0; j < memberInstrument.length; j++) {
          const instrumentValue = {
            name: memberInstrument[j].name,
            member: [
              {
                name: [member[i].name],
                lifeSpan: memberInstrument[j].lifeSpan
              }
            ]
          };
          if (memberInstrument[j].name == "original") { }
          else {
            const double = artistInstrument.findIndex(a => a.name === memberInstrument[j].name);
            if (double > -1) {
              artistInstrument[double].member.push(instrumentValue.member[0]);
            }
            else {
              artistInstrument.push(instrumentValue);
            }
          }
        }

      }
    }
  }
  artistInstrument.sort((a, b) => a.name.localeCompare(b.name));
}

function generateMemberInstrumentTable(json) {
  sortInstruments(json);
  console.log(json);
  let table = `<h1>Instrument Table</h1>`;
  table += `<table>`;
  table += `</table>`;
  table += ``;
}