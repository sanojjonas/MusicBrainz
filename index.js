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
        name: "Absolutely Free Festival",
        id: "62e32667-1bdc-497b-a859-17d9192d60b7"
      },
      {
        name: "Pukkelpop",
        id: "d578e8a2-2d72-43c2-b871-84eb44319b69"
      },
      {
        name: "Rock Herk",
        id: "d47425e5-2706-4b3d-91d6-dbd5abd08494"
      }
    ]
  }
}

let busy = false;
let count = 0;

function load() {
  changeButtons("serie");
}

function manualGet(type) {
  const mbId = document.getElementById("mbId").value;
  const checkbox = document.getElementById("checkbox").checked;
  grabStuff(type, mbId, checkbox);
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
  let sortedList = []
  sortedList = list.sort((a, b) => {
    if (a.event && b.event) {
      return b.event.length - a.event.length
    } else {
      return a.name.localeCompare(b.name);
    }
  })

  let items = "<table>";
  for (let i = 0; i < sortedList.length; i++) {
    items += `<tr><td><button id="fetch" onclick="grabStuff('${type}','${sortedList[i].id}',false,'right')">fetch</button>`;
    items += `<button id="full" onclick="grabStuff('${type}','${sortedList[i].id}',true,'right')">full</button>`;
    items += ` ${sortedList[i].name}</td>`;
    if (sortedList[i].event && sortedList[i].event.length > 0) {
      const event = sortedList[i].event;
      items += `<td>${event.length}</td>`;
      items += `<td>`;
      for (let j = 0; j < event.length; j++) {
        items += `${event[j].name} <br>`;
      }
      items += `</td>`;
    }
    items += `</tr>`;
  }
  items += `</table>`;
  updateText(div, items);
}

async function fetchMusicBrainz(type, id, includes) {
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
  try {
    let musicbrainzUrl = "";
    if (includes) {
      musicbrainzUrl = `https://musicbrainz.org/ws/2/${type}/${id}?inc=aliases+${includes}&fmt=json`;
    } else {
      musicbrainzUrl = `https://musicbrainz.org/ws/2/${type}/${id}?inc=aliases+artist-rels+event-rels+place-rels&fmt=json`;
    }
    let data = await fetch(musicbrainzUrl);
    await sleep(1000);
    if (!data.ok) {
      console.log(musicbrainzUrl);
      throw new Error('woepsedaisy');
    }
    let json = await data.json()
    count += 1;
    updateText("load", count);
    return json
  }
  catch {
    console.log("error but try to continue after 5 seconds");
    await sleep(5000);
    fetchMusicBrainz(type, id, includes);
  }
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
    }
    else if (item.begin) {
      json.lifeSpan = checkLifeSpan({
        begin: item.begin,
        end: item.end,
        ended: item.ended
      })
    }
  }
  if (item.type == "Festival") {
    json.lifeSpan = {
      ...json.lifeSpan,
      startTime: 20 * 60,
      endTime: 20 * 60
    }
  }
  return json;
}

function sortItems(item, json) {
  const relation = item.relations;
  for (let i = 0; i < relation.length; i++) {
    const itemValue = getValues(relation[i]);
    if (relation[i]['attribute-values'].time) {
      const time = relation[i]['attribute-values'].time;
      if (time != "") {
        let startHour = 0;
        let startMinute = 0;
        let startTime = 0;
        let endHour = 0;
        let endMinute = 0;
        let endTime = 0;
        if (time.split(" - ")[1]) {
          startHour = +time.split(" - ")[0].split(":")[0];
          startMinute = +time.split(" - ")[0].split(":")[1];
          startTime = (startHour * 60) + startMinute;
          endHour = +time.split(" - ")[1].split(":")[0];
          endMinute = +time.split(" - ")[1].split(":")[1];
          endTime = (endHour * 60) + endMinute;
        } else {
          startHour = +time.split(":")[0];
          startMinute = +time.split(":")[1];
          start = (startHour * 60) + startMinute;
          end = start + 30;
          startHour = ~~(end / 60);
          startMinute = end % 60;
        }
        if (startHour < 6) {
          startTime = ((startHour + 24) * 60) + startMinute;
        }
        if (endHour < 6) {
          endTime = ((endHour + 24) * 60) + endMinute;
        }
        itemValue.lifeSpan = {
          ...itemValue.lifeSpan,
          startTime: startTime,
          startHour: startHour,
          startMinute: startMinute,
          endTime: endTime,
          endHour: endHour,
          endMinute: endMinute
        }
      }

    }
    if ((relation[i].type == "founder"
      || relation[i].type == "member of band"
      || relation[i].type == "instrumental supporting musician"
      || relation[i].type == "is person")
      && relation[i].direction == "backward") {
      //child member
      if (relation[i]['source-credit'] != "") {
        console.log("TODO add source credit stuff")
      } else {
        const double = json.child.member.findIndex(a => a.id === itemValue.id);
        if (double > -1) {
          for (let j = 0; j < itemValue.child.instrument.length; j++) {
            json.child.member[double].child.instrument.push(itemValue.child.instrument[j]);
          }
        } else {
          json.child.member.push(itemValue);
        }
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
      json.child.artist.push(itemValue);
    }
    else if ((relation[i].type == "main performer"
      || relation[i].type == "support act"
      || relation[i].type == "guest performer"
      || relation[i].type == "tribute to")
      && relation[i].direction == "forward") {
      //event parent (of member)
      json.parent.event.push(itemValue);
    }
    else if ((relation[i].type == "parts")
      && relation[i].direction == "backward") {
      //event parent (of other event)
      json.parent.event.push(itemValue);
    }
    else if ((relation[i].type == "parts"
      && relation[i].direction == "forward")
      //event child of other event
      || (relation[i].type == "part of"
        && relation[i].direction == "backward")) {
      //event child of series
      json.child.event.push(itemValue);
    }
    else if ((relation[i].type == "engineer position"
      || relation[i].type == "held at"
      || relation[i].type == "studied at"
      || relation[i].type == "teacher")
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
    case "series":
      generateEventList(json, [], [], "series");
      if (deeperJson.event.length > 0) {
        for (let i = 0; i < deeperJson.event.length; i++) {
          const event = deeperJson.event[i];
          const eventItem = await fetchMusicBrainz("event", event.id)
          deeperJson.event[i] = sortItems(eventItem, deeperJson.event[i]);
          await checkDeeper("event", deeperJson.event[i]);
          generateEventList(json, [], [], "series");
        }
      }
      break;
    default:
      console.log(type);
      console.log(json);
      throw new Error("add more deeper checker");
  }
}

async function grabStuff(type, id, full) {
  if (busy === false) {
    //try {
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
          generateMemberInstrumentSchedule(json);
          break;
        case "event":
          await checkDeeper("event", json);
          generateEventList(json, [], []);
          generateEventSchedule(json);
          break;
        case "series":
          await checkDeeper("series", json);
          generateEventList(json, [], [], "series");
          break;
        default:
          throw new Error("add extra full get stuff");
      }
    }
    else {
      switch (type) {
        case "artist":
          generateMemberInstrumentSchedule(json);
          break;
        case "event":
          generateEventList(json, [], []);
          break;
        case "series":
          generateEventList(json, [], []);
          break;
        default:
          throw new Error("add extra fetch get stuff");
      }
    }

    count += ` done`;
    updateText("load", count);
    //console.log(json);
    busy = false;
    /* } catch (err) {
       updateText("load", "ERROR");
       updateText("bottom1", err);
       throw new Error(err);
       busy = false;
     }*/
  } else {
    console.log("do nothing when busy");
  }
}

function generateMemberArtistList(json) {
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

function generateEventList(json, eventList, artistList, type) {
  if (json.child.artist.length > 0) {
    const artistChild = json.child.artist;
    for (let j = 0; j < artistChild.length; j++) {
      const double = artistList.findIndex(a => a.id === artistChild[j].id);
      if (type === "series") {
        if (double > -1) {
          artistList[double].event.push({ name: json.name, id: json.id });
        } else {
          artistList.push({ name: artistChild[j].name, id: artistChild[j].id, event: [{ name: json.name, id: json.id }] })
        }
      } else {
        artistList.push({ name: artistChild[j].name, id: artistChild[j].id })
      }

    }
  }
  if (json.child.event.length > 0) {
    const eventChild = json.child.event;
    for (let i = 0; i < eventChild.length; i++) {
      eventList.push({ name: eventChild[i].name, id: eventChild[i].id });
      generateEventList(eventChild[i], eventList, artistList, type);
    }
  }
  if (type === undefined) {
    itemList("event", eventList, "right");
    itemList("artist", artistList, "right2");
  } else
    if (type === "series") {
      itemList("event", eventList, "right");
      itemList("series", artistList, "right2");
    }
    else {
      throw new Error("incorrect list type");
    }
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
  groupInstruments(json);
}
function groupInstruments(json) {
  if (json.child.instrument.length > 0) {
    const instrument = json.child.instrument;
    for (let i = 0; i < instrument.length; i++) {
      let group = [];
      if (instrument[i].member.length > 0) {
        const member = instrument[i].member.sort((a, b) => {
          if (a.lifeSpan.begin == b.lifeSpan.begin) {
            return b.lifeSpan.end - a.lifeSpan.end;
          }
          else {
            return a.lifeSpan.begin - b.lifeSpan.begin;
          }
        })
        const memberLegnth = member.length;
        for (let k = 0; k <= memberLegnth; k++) {
          for (let j = 0; j < group.length; j++) {
            if (group[j].length > 0) {
              if (group[j][group[j].length - 1].lifeSpan.end <= member[0].lifeSpan.begin) {
                group[j].push(member[0]);
                member.splice(0, 1);
                break;
              }
            }
            else {
              group.push([member[0]]);
              member.splice(0, 1);
            }
          }
          if (member.length != memberLegnth - k) {
            group.push([member[0]]);
            member.splice(0, 1)
          }
        }
      }
      instrument[i].groups = group;
    }
  }
}

function addItemToTable(text, length, preLength) {
  let td = ""
  if (preLength != 0) {
    td += `<td colspan="${preLength}"></td>`;
  }
  if (length != 0) {
    td += `<td colspan="${length}">`;
    for (let i = 0; i < text.length; i++) {
      td += text[i];
    }
    td += '</td>';
  }
  return td;
}

function generateMemberInstrumentSchedule(json) {
  sortInstruments(json);
  const calender = {
    begin: json.lifeSpan.begin,
    end: json.lifeSpan.end,
    duration: json.lifeSpan.end - json.lifeSpan.begin
  }
  const instrument = json.child.instrument;
  let table = `<h1>Instrument Table</h1>`;
  table += `<table><col id="instrument"/>`;
  for (let i = 0; i <= calender.duration * 4; i++) {
    table += `<col id="instrument"/>`;
  }
  table += `<tr><td><b>${json.name}</b></td>`
  for (let i = 0; i <= calender.duration; i++) {
    table += `<td colspan="4">${calender.begin + i}</td>`;
  }
  table += `</tr>`;
  if (instrument.length > 0) {
    for (let i = 0; i < instrument.length; i++) {
      if (instrument[i].groups.length > 0) {
        const groups = instrument[i].groups;
        for (let j = 0; j < groups.length; j++) {
          if (j === 0) {
            table += `<tr><td rowspan="${groups.length}">${instrument[i].name}</td>`;
          }
          else {
            table += `<tr>`;
          }
          let text = [];
          let length = 0;
          let preLength = 0;
          for (let k = 0; k < groups[j].length; k++) {
            text = [
              groups[j][k].name,
              " ",
              groups[j][k].lifeSpan.begin,
              "-",
              groups[j][k].lifeSpan.end
            ];
            if (groups[j][k].lifeSpan.begin == groups[j][k].lifeSpan.end) {
              length = 4;
            } else {
              length = (groups[j][k].lifeSpan.end - groups[j][k].lifeSpan.begin) * 4;
            }
            if (groups[j][k].lifeSpan.begin != calender.begin) {
              if (k == 0) {
                preLength = (groups[j][k].lifeSpan.begin - calender.begin) * 4;
              }
            }
            if (k > 0) {
              if (groups[j][k].lifeSpan.begin == groups[j][k - 1].lifeSpan.end) {
                preLength = 0;
              } else if (groups[j][k].lifeSpan.begin - 1 == groups[j][k - 1].lifeSpan.end) {
                preLength = 0;
              }
              else {
                preLength = (groups[j][k].lifeSpan.begin - groups[j][k - 1].lifeSpan.end) * 4;
              }
            }
            if (0 < k && k < groups[j].length - 1) {
              if (groups[j][k].lifeSpan.end == groups[j][k + 1].lifeSpan.begin) {
                if (groups[j][k].lifeSpan.begin == groups[j][k - 1].lifeSpan.end) {

                } else {
                  length = length + 2
                }
              }
            }
            if (groups[j][k].lifeSpan.ended == false) {
              length = length + 1;
            }
            table += addItemToTable(text, length, preLength);
            if (k == (groups[j].length - 1) && groups[j][k].lifeSpan.end != calender.end) {
              table += addItemToTable([], 0, (calender.end - groups[j][k].lifeSpan.end + 1) * 4)
            }
          }
        }
        table += `</tr>`;
      }
    }
  } else {
    table += `<tr><td colspan="100%">No Instruments yet</td></tr>`;
  }
  table += `</table>`;
  table += ``;
  updateText("bottom1", table);
}

function addArtistsToMainEvent(json) {
  if (json.child.event.length > 0) {
    const eventChild = json.child.event;
    for (let i = 0; i < eventChild.length; i++) {
      if (eventChild[i].child.event.length > 0) {
        const eventChild2 = eventChild[i].child.event;
        for (let j = 0; j < eventChild2.length; j++) {
          if (eventChild2[j].child.artist.length > 0) {
            const artist = eventChild2[j].child.artist;
            for (let m = 0; m < artist.length; m++) {
              artist[m].lifeSpan = {
                ...artist[m].lifeSpan,
                begin: eventChild2[j].lifeSpan.begin,
                end: eventChild2[j].lifeSpan.end,
                ended: eventChild2[j].lifeSpan.ended
              }
              const double = json.child.artist.findIndex(a => a.id === artist[m].id);
              if (double > -1) {
                json.child.artist[double] = artist[m];
              }
              else {
                json.child.artist.push(artist[m]);
              }
              if (json.lifeSpan.startTime > artist[m].lifeSpan.startTime) {
                json.lifeSpan.startTime = artist[m].lifeSpan.startTime;
              }
              if (json.lifeSpan.endTime < artist[m].lifeSpan.endTime) {
                json.lifeSpan.endTime = artist[m].lifeSpan.endTime;
              }
            }
          }
        }
      } else {
        if (eventChild[i].child.artist.length > 0) {
          const artist = eventChild[i].child.artist;
          for (let m = 0; m < artist.length; m++) {
            artist[m].lifeSpan = {
              ...artist[m].lifeSpan,
              begin: eventChild[i].lifeSpan.begin,
              end: eventChild[i].lifeSpan.end,
              ended: eventChild[i].lifeSpan.ended
            }
            const double = json.child.artist.findIndex(a => a.id === artist[m].id);
            if (double > -1) { }
            else {
              artist[m].lifeSpan = {
                ...artist[m].lifeSpan,
                begin: json.lifeSpan.begin,
                end: json.lifeSpan.end,
                ended: json.lifeSpan.ended
              }
              json.child.artist.push(artist[m]);
              if (json.lifeSpan.startTime > artist[m].lifeSpan.startTime) {
                json.lifeSpan.startTime = artist[m].lifeSpan.startTime;
              }
              if (json.lifeSpan.endTime < artist[m].lifeSpan.endTime) {
                json.lifeSpan.endTime = artist[m].lifeSpan.endTime;
              }
            }
          }
        }
      }
    }
  } else {
    if (json.child.artist.length > 0) {
      const artist = json.child.artist;
      for (let m = 0; m < artist.length; m++) {
        const double = json.child.artist.findIndex(a => a.id === artist[m].id);
        if (double > -1) {
          json.child.artist[double] = artist[m];
        }
        else {
          json.child.artist.push(artist[m]);
        }
        if (json.lifeSpan.startTime > artist[m].lifeSpan.startTime) {
          json.lifeSpan.startTime = artist[m].lifeSpan.startTime;
        }
        if (json.lifeSpan.endTime < artist[m].lifeSpan.endTime) {
          json.lifeSpan.endTime = artist[m].lifeSpan.endTime;
        }
      }

    }
  }
}

function checkEventName(event) {
  let name = ""
  if (event.name.split(": ")[1]) {
    name = event.name.replace(event.parent.event[0].name + ": ", "")
  }
  else if (event.name.split(", ")[1]) {
    name = event.name.replace(event.parent.event[0].name + ", ", "")
  }
  else {
    name = event.name
  }
  return name
}

function addArtistStuffToSchedule(artistChild, calender) {
  let table = ""
  for (let k = 0; k < artistChild.length; k++) {
    let artist = artistChild[k].name;
    if (artistChild[k].lifeSpan.startTime != undefined) {
      for (let l = 1; l < artistChild.length - k; l++) {
        if (artistChild[k].lifeSpan.startTime == artistChild[k + l].lifeSpan.startTime) {
          artist += " + " + artistChild[k + l].name;
        }
      }
    }
    let text = [
      artist,
      "<br>",
      String(artistChild[k].lifeSpan.startHour).padStart(2, '0'),
      ":",
      String(artistChild[k].lifeSpan.startMinute).padStart(2, '0'),
      " - ",
      String(artistChild[k].lifeSpan.endHour).padStart(2, "0"),
      ":",
      String(artistChild[k].lifeSpan.endMinute).padStart(2, "0"),
    ];
    let length = artistChild[k].lifeSpan.endTime - artistChild[k].lifeSpan.startTime;
    let preLength = 0;
    if (k === 0) {
      preLength = artistChild[k].lifeSpan.startTime - calender.startTime;
    } else {
      preLength = artistChild[k].lifeSpan.startTime - artistChild[k - 1].lifeSpan.endTime;
    }
    if (artistChild[k].lifeSpan.startTime == undefined) {
      table += addItemToTable(
        [artistChild[k].name],
        1,
        0
      )
    } else {
      if (k > 0 && artistChild[k].lifeSpan.startTime == artistChild[k - 1].lifeSpan.startTime) {
      }
      else {
        table += addItemToTable(
          text,
          length,
          preLength
        );
      }
      if (k == artistChild.length - 1) {
        if (artistChild[k].lifeSpan.endTime != calender.endTime) {
          table += addItemToTable([], 0, (calender.endTime - artistChild[k].lifeSpan.endTime))
        }
      }
    }



  }
  table += `</tr>`;
  return table;
}

function generateTimeHeader(calender, title) {
  console.log(calender);
  let table = ``;
  if (calender.duration == 0) {
    table += `<tr><td colspan="100%">No Time In Event</td>`;
  } else {
    table += `<tr><td>${title}</td>`
    for (let j = 0; j < calender.duration; j++) {
      if (calender.startHour + j < 24) {
        table += `<td colspan="60">${String(calender.startHour + j).padStart(2, '0')}</td>`;
      }
      else {
        table += `<td colspan="60">${String(calender.startHour + j - 24).padStart(2, '0')}</td>`;
      }
    }
    table += `</tr>`;
  }

  return table;
}

function generateEventSchedule(json) {
  addArtistsToMainEvent(json);
  console.log(json);
  const calender = {}
  calender.startHour = ~~(json.lifeSpan.startTime / 60);
  if (json.lifeSpan.endTime % 60 > 0) {
    calender.endHour = ~~(json.lifeSpan.endTime / 60) + 1;
  } else {
    calender.endHour = ~~(json.lifeSpan.endTime / 60);
  }
  calender.duration = calender.endHour - calender.startHour;
  calender.startTime = calender.startHour * 60;
  calender.endTime = calender.endHour * 60;
  let table = `<h1>Event Schedule</h1>`;
  table += `<table><col/>`;
  for (let j = 0; j < calender.duration * 60; j++) {
    table += `<col/>`;
  }
  table += `<tr><td colspan="100%"><b>${json.name}</b></td></tr>`;
  let table2 = ""
  let timeAlreadyAdded = false;
  if (json.child.event.length > 0) {
    const eventChild = json.child.event;
    for (let i = 0; i < eventChild.length; i++) {
      if (eventChild[i].child.event.length > 0) {
        table2 += generateTimeHeader(calender, checkEventName(eventChild[i]))
        timeAlreadyAdded = true;
        const eventChild2 = eventChild[i].child.event;
        for (let j = 0; j < eventChild2.length; j++) {
          table2 += `<tr><td>${checkEventName(eventChild2[j])}</td>`;
          if (eventChild2[j].child.artist.length > 0) {
            const artistChild = eventChild2[j].child.artist.sort((a, b) => a.lifeSpan.startTime - b.lifeSpan.startTime);
            table2 += addArtistStuffToSchedule(artistChild, calender);
          }
        }
      } else {
        table2 += `<tr><td>${checkEventName(eventChild[i])}</td>`;
        if (eventChild[i].child.artist.length > 0) {
          const artistChild = eventChild[i].child.artist.sort((a, b) => a.lifeSpan.startTime - b.lifeSpan.startTime);
          table2 += addArtistStuffToSchedule(artistChild, calender);
        }
      }
    }
  } else {
    table2 += `<tr><td>${checkEventName(json)}</td>`;
    if (json.child.artist.length > 0) {
      const artistChild = json.child.artist.sort((a, b) => a.lifeSpan.startTime - b.lifeSpan.startTime);
      table2 += addArtistStuffToSchedule(artistChild, calender)
    }
  }
  if (timeAlreadyAdded == false) {
    table += generateTimeHeader(calender, "");
  }
  table += table2;
  updateText("bottom1", table);
}
