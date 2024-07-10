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


let text = '';
let text2 = '';
let text3 = '';
let text4 = '';
let busy = false;
let cycleCount = 0
let eventInfo = {};
let calender = {};
let artistInfo = {};
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
async function nameCheck(name) {
  const festival = new RegExp(/(.)+?\d{4}$/g);
  const festivalStage = new RegExp(/(.)+?\d{4}:(.)+?$/g);
  const festivalDay = new RegExp(/(.)+?\d{4}, Day \d+$/g);
  const festivalDayStage = new RegExp(/(.)+?\d{4}, Day \d+:(.)+?$/g);
  let type = "series";
  if (festival.test(name)) {
    type = "festival"
  }
  if (festivalStage.test(name)) {
    type = "festivalStage"
  }
  if (festivalDay.test(name)) {
    type = "festivalDay"
  }
  if (festivalDayStage.test(name)) {
    type = "festivalDayStage"
  }
  return type;
}

function updateText(div, text) {
  document.getElementById(div).innerHTML = text;
}
function updateInput(id) {
  let input = document.getElementById("select").value;
  if (id) {
    input = id;
  }
  console.log(input);
  document.getElementById("input").value = input;
}
function scrollToTarget(elementId) {
  document.getElementById(elementId).scrollIntoView(true);
}
function manualGet(type) {
  const mbId = document.getElementById("mbId").value;
  const checkbox = document.getElementById("checkbox").checked;
  if (type == "event") {
    eventstuff(type, mbId, checkbox, "events2");
  }
  else {
    artiststuff(type, mbId, checkbox, "events2");
  }
}

function favoriteEvents() {
  let likedEvents = "";
  let knoppen = `<button id="fetch" onclick="favoriteEvents()">favorites events</button>`;
  knoppen += `<button id="fetch" onclick="favoriteArtists()">favorites artists</button>`

  for (let i = 0; i < user.series.liked.length; i++) {
    knoppen += `<button id="fetch" onclick="eventstuff('series','${user.series.liked[i].id}',false,'events')">${user.series.liked[i].name}</button>`
  }
  for (let i = 0; i < user.event.liked.length; i++) {
    likedEvents += `<button id="fetch" onclick="eventstuff('event','${user.event.liked[i].id}',false,'events2')">Fetch</button><button id="full" onclick="eventstuff('event','${user.event.liked[i].id}',true,'events2')">Full</button> ${user.event.liked[i].name}<br>`
  }
  updateText("series", knoppen);
  updateText("events", likedEvents);
  updateText("events2", "");
  updateText("container2", "");
  updateText("container3", "");
}
function favoriteArtists() {
  let likedArtists = "";
  let knoppen = `<button id="fetch" onclick="favoriteEvents()">favorites events</button>`;
  knoppen += `<button id="fetch" onclick="favoriteArtists()">favorites artists</button>`;
  for (let i = 0; i < user.artist.liked.length; i++) {
    likedArtists += `<button id="fetch" onclick="artiststuff('artist','${user.artist.liked[i].id}',false,'events2')">Fetch</button><button id="full" onclick="artiststuff('artist','${user.artist.liked[i].id}',true,'events2')">Full</button> ${user.artist.liked[i].name}<br>`
  }
  updateText("series", knoppen);
  updateText("events", likedArtists);
  updateText("events2", "");
  updateText("container2", "");
  updateText("container3", "");
}

async function fetchMusicBrainz(type, id, speed = 1000) {

  const musicBrainzUrl = `https://musicbrainz.org/ws/2/${type}/${id}?inc=aliases+artist-rels+place-rels+event-rels+series-rels&fmt=json`;
  let data = await fetch(musicBrainzUrl);
  await sleep(speed);
  if (!data.ok) {
    console.log(musicBrainzUrl);
    console.log('woeps');
    const musicBrainzUrl2 = `https://musicbrainz.org/ws/2/series/${id}?inc=aliases+artist-rels+place-rels+event-rels+series-rels&fmt=json`;
    const data2 = await fetch(musicBrainzUrl2);
    await sleep(speed);
    if (!data2.ok) {
      busy = false;
      console.log(musicBrainzUrl2);
      throw new Error('da fuk');
    } else {
      data = data2;
    }
  }
  cycleCount += 1;
  text = cycleCount;
  updateText("load", text);
  let json = await data.json();
  return json;
}

async function fetchMusicBrainzExtended(type, id, includes) {
  const speed = 1000;
  const musicbrainzUrl = `https://musicbrainz.org/ws/2/${type}/${id}?inc=${includes}&fmt=json`;
  let data = await fetch(musicbrainzUrl);
  await sleep(speed);
  if (!data.ok) {
    console.log(musicbrainzUrl);
    throw new Error('woepsedaisy');
  }
  let json = await data.json()
  //console.log(musicbrainzUrl);
  //console.log(json);
  return json
}

async function fetchFamily(item3, json, div = "events2") {
  let count = -1;
  console.log(item3)
  if (item3.relations) {
    for (let i = 0; i < item3.relations.length; i++) {
      let item = item3.relations[i];
      let type;
      let url;
      let item2 = item;
      let itemValue = {};

      if (item.event) {
        type = 'event';
        url = item.event;
        itemValue = {
          name: item.event.name,
          id: item.event.id,
          lifeSpan: {},
          founder: false,
          child: {
            event: [],
            artist: [],
            other: [],
            instrument: []
          },
          parent: {
            event: [],
            artist: [],
            series: [],
            other: []
          }
        }
      }
      else if (item.artist) {
        type = 'artist';
        url = item.artist;
        itemValue = {
          name: item.artist.name,
          id: item.artist.id,
          lifeSpan: checkLifeSpan(item),
          founder: false,
          child: {
            event: [],
            artist: [],
            other: [],
            instrument: []
          },
          parent: {
            event: [],
            artist: [],
            series: [],
            other: []
          }
        }
      }
      else if (item.series) {
        type = 'series';
        url = item.series;
      }
      else if (item.area) {
        type = 'area';
        url = item.area;
      }
      else if (item.place) {
        type = 'place';
        url = item.place;
      }
      else {
        console.log(item);
        throw new Error("woeps");
      }

      if (item['attribute-values'].time) {
        const time = item['attribute-values'].time;
        if (time != "") {
          let startHour = 0;
          let startMinute = 0;
          let start = 0;
          let endHour = 0;
          let endMinute = 0;
          let end = 0;
          if (time.split(" - ")[1]) {
            startHour = +time.split(" - ")[0].split(":")[0];
            startMinute = +time.split(" - ")[0].split(":")[1];
            start = (startHour * 60) + startMinute;
            endHour = +time.split(" - ")[1].split(":")[0];
            endMinute = +time.split(" - ")[1].split(":")[1];
            end = (endHour * 60) + endMinute;
          } else {
            startHour = +time.split(":")[0];
            startMinute = +time.split(":")[1];
            start = (startHour * 60) + startMinute;
            end = start + 30;
            startHour = ~~(end / 60);
            startMinute = end % 60;
          }
          if (startHour < 6) {
            start = ((startHour + 24) * 60) + startMinute;
          }
          if (endHour < 6) {
            end = ((endHour + 24) * 60) + endMinute;
          }

          itemValue = {
            ...itemValue,
            time: time,
            startHour: startHour,
            startMinute: startMinute,
            start: start,
            endHour: endHour,
            endMinute: endMinute,
            end: end,
            playTime: end - start
          }
        }
      }

      switch (type) {
        case "event":
          itemValue.eventType = await (nameCheck(item2.name));
          if ((item.type == "parts" && item.direction == "forward")
            || (item.type == "part of" && item.direction == "backward")
          ) {
            json.child.event.push(itemValue);
            count += 1;
            text2 += `<button id="fetch" onclick="eventstuff('event','${itemValue.id}',false,'events2')">Fetch</button><button id="full" onclick="eventstuff('event','${itemValue.id}',true,'events2')">Full</button> ${itemValue.name}<br>`;
          }
          else if ((item.type == "parts" && item.direction == "backward")
            || (item.type == "part of" && item.direction == "forward")) {
            json.parent.event.push(itemValue);
          }
          else if ((item.type == "main performer"
            || item.type == "support act"
            || item.type == "guest performer"
            || item.type == "host"
            || item.type == "tribute to")
            && item.direction == "forward") {
            json.parent.event.push(itemValue);
          }
          else {
            console.log(item);
            throw new Error("incorrect event type/direction");
          }
          break;
        case "artist":
          if (item.type == "founder"
            && item.direction == "backward") {
            itemValue.founder = true;
            const double = json.child.member.findIndex(a => a.id === itemValue.id);
            if (double > -1) {
              json.child.member[double].founder = true;
            } else {
              json.child.member.push(itemValue);
              text2 += `member: ${itemValue.name}<br>`;
            }
          }
          else if (item.type == "founder"
            && item.direction == "forward") {
            itemValue.founder = true;
            const double = json.parent.artist.findIndex(a => a.id === itemValue.id);
            if (double > -1) {
              json.parent.artist[double].founder = true;
            } else {
              json.parent.artist.push(itemValue);
            }
          }
          else if ((item.type == "member of band"
            || item.type == "supporting musician")
            && item.direction == "backward") {
            //let begin = item.lifeSpan.begin;
            //let end = item.lifeSpan.end;
            if (item['source-credit'] === "") {
              if (item.attributes) {
                for (let m = 0; m < item.attributes.length; m++) {
                  const lifeSpan = await checkLifeSpan({
                    begin: item.begin,
                    end: item.end,
                    ended: item.ended
                  })
                  let instrument = {
                    name: item.attributes[m],
                    begin: lifeSpan.begin,
                    end: lifeSpan.end
                  }
                  itemValue.child.instrument.push(instrument);
                }
              }
              const double = json.child.member.findIndex(a => a.id === itemValue.id);
              if (double > -1) {
                for (let n = 0; n < itemValue.child.instrument.length; n++) {
                  json.child.member[double].child.instrument.push(itemValue.child.instrument[n]);
                }
              } else {
                json.child.member.push(itemValue);
                text2 += `member: ${itemValue.name}<br>`;
              }
            }

          }
          else if ((item.type == "member of band"
            || item.type == "collaboration"
            || item.type == "supporting musician"
            || item.type == "instrumental supporting musician"
            || item.type == "vocal supporting musician")
            && item.direction == "forward") {
            const double = json.parent.artist.findIndex(a => a.id === itemValue.id);
            if (double > -1) {
              json.parent.artist[double].founder = true;
            } else {
              json.parent.artist.push(itemValue);
            }
          }
          else if (((item.type == "main performer"
            || item.type == "subgroup"
            || item.type == "tribute"
            || item.type == "sibling"
            || item.type == "married"
            || item.type == "parent"
            || item.type == "involved with"
            || item.type == "is person")
            && item.direction == "backward")
            || ((item.type == "parent"
              || item.type == "is person"
              || item.type == "involved with"
              || item.type == "sibling")
              && item.direction == "forward")) {
            itemValue.artistType = item.type;
            json.child.artist.push(itemValue);
          }
          else {
            console.log(item);
            throw new Error("incorrect artist type/direction");
          }
          break;
        case "series":
          itemValue.eventType = await (nameCheck(item2.name));
          if ((item.type == "part of"
            || item.type == "tour")
            && item.direction == "forward") {
            json.parent.series.push(itemValue);
          } else {
            console.log(item)
            throw new Error("incorrect series type/direction");
          }
          break;
        case "place":
          if ((item.type == "held at")
            && item.direction == "forward") {
            json.parent.other.push(itemValue)
          }
          else if ((item.type == "engineer position"
            || item.type == "founder"
            || item.type == "studied at")
            && item.direction == "forward") {
            json.child.other.push(itemValue)
          }
          else {
            console.log(item);
            throw new Error("incorrect place type/direction");
          }
          break;
        default:
          console.log(item);
          throw new Error("add more types")
      }
      updateText(div, text2);
    }
  }
}
async function fetchEventFamily(json, div = "events2") {
  for (let i = 0; i < json.child.event.length; i++) {
    deeperEvent = await fetchMusicBrainz('event', json.child.event[i].id);
    await fetchFamily(deeperEvent, json.child.event[i], div);
  }
}
async function fetchArtistFamily(json, div = "events2") {
  for (let i = 0; i < json.child.member.length; i++) {
    member = await fetchMusicBrainz('artist', json.child.member[i].id);
    await fetchFamily(member, json.child.member[i], div);
  }
}

function checkFestivalType(eventInfo, div) {
  let days = 0;
  let stages = 0;
  let artists = 0;
  eventInfo.time = true;
  if (eventInfo.child.event.length > 0) {
    //has lower events, could be days or stages
    for (let i = 0; i < eventInfo.child.event.length; i++) {
      if (eventInfo.child.event[i].child.event.length > 0) {
        //has lower event in events = stages in events
        days += 1;
        let mostStages = 0;
        for (let j = 0; j < eventInfo.child.event[i].child.event.length; j++) {
          mostStages += 1;
          if (eventInfo.child.event[i].child.event[j].child.artist.length > 0) {
            // has artists in events in events = artists in stages in days
            let mostArtists = 0;
            for (let k = 0; k < eventInfo.child.event[i].child.event[j].child.artist.length; k++) {
              mostArtists += 1;
              if (eventInfo.child.event[i].child.event[j].child.artist[k].time) {
                if (eventInfo.start > eventInfo.child.event[i].child.event[j].child.artist[k].start) {
                  eventInfo.start = eventInfo.child.event[i].child.event[j].child.artist[k].start;
                  eventInfo.startHour = eventInfo.child.event[i].child.event[j].child.artist[k].startHour;
                }
                if (eventInfo.end < eventInfo.child.event[i].child.event[j].child.artist[k].end) {
                  eventInfo.end = eventInfo.child.event[i].child.event[j].child.artist[k].end;
                  eventInfo.endHour = eventInfo.child.event[i].child.event[j].child.artist[k].endHour;
                }
              }
              else {
                eventInfo.time = false;
              }
            }
            if (eventInfo.mostArtists < mostArtists) {
              eventInfo.mostArtists = mostArtists;
            }
          } else {
            // don't have artists but does have events in events = no artist in stages in days
          }
        }
        if (eventInfo.mostStages < mostStages) {
          eventInfo.mostStages = mostStages;
        }
        if (eventInfo.child.event[i].child.artist.length > 0) {
          // doesn't have events in events but does have artists in events = multiple days one stage OR one day multiple stages
          let mostArtists = 0;
          for (let k = 0; k < eventInfo.child.event[i].child.artist.length; k++) {
            mostArtists += 1;
            if (eventInfo.child.event[i].child.artist[k].time) {
              if (eventInfo.start > eventInfo.child.event[i].child.artist[k].start) {
                eventInfo.start = eventInfo.child.event[i].child.artist[k].start;
                eventInfo.startHour = eventInfo.child.event[i].child.artist[k].startHour;
              }
              if (eventInfo.end < eventInfo.child.event[i].child.artist[k].end) {
                eventInfo.end = eventInfo.child.event[i].child.artist[k].end;
                eventInfo.endHour = eventInfo.child.event[i].child.artist[k].endHour;
              }
            } else {
              eventInfo.time = false;
            }
          }
          if (eventInfo.mostArtists < mostArtists) {
            eventInfo.mostArtists = mostArtists;
          }
        }
      }
      else {
        stages += 1;
        if (eventInfo.child.event[i].child.artist.length > 0) {
          let mostArtists = 0;
          for (let k = 0; k < eventInfo.child.event[i].child.artist.length; k++) {
            mostArtists += 1;
            if (eventInfo.child.event[i].child.artist[k].time) {
              if (eventInfo.start > eventInfo.child.event[i].child.artist[k].start) {
                eventInfo.start = eventInfo.child.event[i].child.artist[k].start;
                eventInfo.startHour = eventInfo.child.event[i].child.artist[k].startHour;
              }
              if (eventInfo.end < eventInfo.child.event[i].child.artist[k].end) {
                eventInfo.end = eventInfo.child.event[i].child.artist[k].end;
                eventInfo.endHour = eventInfo.child.event[i].child.artist[k].endHour;
              }
            } else {
              eventInfo.time = false;
            }
          }
          if (eventInfo.mostArtists < mostArtists) {
            eventInfo.mostArtists = mostArtists;
          }
        }
      }
    }
    if (eventInfo.days < days) {
      eventInfo.days = days;
    }
    if (eventInfo.stages < stages) {
      eventInfo.stages = stages;
    }
  } else {
    console.log("1day 1stage")
    if (eventInfo.child.artist.length > 0) {
      for (let k = 0; k < eventInfo.child.artist.length; k++) {
        artists += 1;
        if (eventInfo.child.artist[k].time) {
          if (eventInfo.start > eventInfo.child.artist[k].start) {
            eventInfo.start = eventInfo.child.artist[k].start;
            eventInfo.startHour = eventInfo.child.artist[k].startHour;
          }
          if (eventInfo.end < eventInfo.child.artist[k].end) {
            eventInfo.end = eventInfo.child.artist[k].end;
            eventInfo.endHour = eventInfo.child.artist[k].endHour;
          }
        } else {
          eventInfo.time = false;
        }
      }
      if (eventInfo.artists < artists) {
        eventInfo.artists = artists;
      }

    }
  }

  if (eventInfo.days > 0) {
    console.log("multiple days");
    if (eventInfo.mostStages > 0) {
      console.log("multiple days multiple stages");
      if (eventInfo.time === true) {
        eventInfo.festivalType = "multiDayMultiStage";
      } else {
        eventInfo.festivalType = "multiDayMultiStageNoTime";
      }
    } else {
      console.log("multiple days one stage");
      if (eventInfo.time === true) {
        eventInfo.festivalType = "multiDayOneStage";
      } else {
        eventInfo.festivalType = "multiDayOeStageNoTime";
      }
    }
  } else {
    console.log("one day")
    if (eventInfo.stages > 0) {
      console.log("one day multiple stages");
      if (eventInfo.time === true) {
        eventInfo.festivalType = "oneDayMultiStage";
      } else {
        eventInfo.festivalType = "oneDayMultiStageNoTime";
      }
    } else {
      console.log("one day one stage");
      if (eventInfo.time === true) {
        eventInfo.festivalType = "oneDayOneStage";
      } else {
        eventInfo.festivalType = "oneDayOneStageNoTime";
      }
    }
  }

  switch (eventInfo.festivalType) {
    case "multiDayMultiStage":
      createSchedule(eventInfo, div);
      break;
    case "multiDayMultiStageNoTime":
      createList(eventInfo, div);
      break;
    case "multiDayOneStage":
      createSchedule(eventInfo, div);
      break;
    case "multiDayOneStageNoTime":
      createList(eventInfo, div);
      break;
    case "oneDayMultiStage":
      createSchedule(eventInfo, div);
      break;
    case "oneDayMultiStageNoTime":
      createList(eventInfo, div);
      break;
    case "oneDayOneStage":
      createSchedule(eventInfo, div);
      break;
    case "oneDayOneStageNoTime":
      createList(eventInfo, div);
      break;
    case "noArtist":
      createBox(eventInfo, div);
      break;
    default:
      console.log(eventInfo);
      throw new Error("unkown festival type");
  }
}
async function checkMemberFunction(artistInfo, div) {
  if (artistInfo.child.member.length > 0) {
    const member = artistInfo.child.member;
    for (let i = 0; i < member.length; i++) {
      if (member[i].child.instrument.length > 0) {
        const instrument = member[i].child.instrument;
        for (let j = 0; j < instrument.length; j++) {
          let begin = instrument[j].begin;
          let end = instrument[j].end;
          const instrumentValue = {
            name: instrument[j].name,
            member: [
              {
                name: member[i].name,
                begin: begin,
                end: end
              }
            ]
          };
          if (instrument[j].name == "original") {
          } else {
            const double = artistInfo.child.instrument.findIndex(a => a.name === instrument[j].name);
            if (double > -1) {
              artistInfo.child.instrument[double].member.push(instrumentValue.member[0]);
            } else {
              artistInfo.child.instrument.push(instrumentValue);
            }
          }

        }
      }
    }
  }
  sortInstruments(artistInfo);
  createArtistInstrumentList(artistInfo, div);
}
async function sortInstruments(artist) {
  if (artist.child.instrument.length > 0) {
    const instrument = artist.child.instrument;
    for (let i = 0; i < instrument.length; i++) {
      let group = []
      if (instrument[i].member.length > 0) {
        const member = instrument[i].member.sort((a, b) => {
          if (a.begin == b.begin) {
            return b.end - a.end;
          } else {
            return a.begin - b.begin;
          }
        })
        const memLen = member.length
        for (let k = 0; k <= memLen; k++) {
          for (let j = 0; j < group.length; j++) {
            if (group[j].length > 0) {
              if (group[j][group[j].length - 1].end <= member[0].begin) {
                group[j].push(member[0]);
                member.splice(0, 1);
                break;
              }
            }
            else {
              group.push([member[0]]);
              member.splice(0, 1);
              break;
            }
          }
          if (member.length != memLen - k) {
            group.push([member[0]]);
            member.splice(0, 1);
          }

        }
      }
      instrument[i].groups = group;
    }
  }
}
async function lifeSpanNumber(lifeSpan) {
  let newLifeSpan = {}
  if (lifeSpan.begin === null) {
    newLifeSpan.begin = 0;
  } else if (lifeSpan.begin.split("-")[1]) {
    newLifeSpan.begin = +lifeSpan.begin.split("-")[0];
  } else {
    newLifeSpan.begin = +lifeSpan.begin;
  }
  if (lifeSpan.end === null) {
    newLifeSpan.end = 0;
  } else if (lifeSpan.end.split("-")[1]) {
    newLifeSpan.end = +lifeSpan.end.split("-")[0];
  } else {
    newLifeSpan.end = +lifeSpan.end;
  }
  newLifeSpan.ended = lifeSpan.ended;

  return newLifeSpan;
}

async function checkLifeSpan(fetched) {
  let fetchedLifeSpan;
  if (fetched['life-span']) {
    fetchedLifeSpan = await lifeSpanNumber(fetched['life-span']);
  } else {
    fetchedLifeSpan = await lifeSpanNumber({
      begin: fetched.begin,
      end: fetched.end,
      ended: fetched.ended
    })
  }
  const yearNow = new Date().getFullYear();
  let newLifeSpan = {};

  if (fetchedLifeSpan.begin === 0) {
    newLifeSpan.begin = yearNow;
  } else {
    newLifeSpan.begin = fetchedLifeSpan.begin;
  }
  if (fetchedLifeSpan.end === 0) {
    newLifeSpan.end = yearNow;
  } else {
    newLifeSpan.end = fetchedLifeSpan.end;
  }
  newLifeSpan.ended = fetchedLifeSpan.ended;
  return newLifeSpan;
}

async function eventstuff(type, id, full, div) {
  if (busy === false) {
    busy = true;
    cycleCount = 0;
    text2 = ""
    updateText("events2", text2);
    updateText("container2", text2);
    updateText("container3", "");
    const event = await fetchMusicBrainz(type, id);
    const eventType = await (nameCheck(event.name));
    const startHour = 20;
    const endHour = 23;
    eventInfo = {
      name: event.name,
      id: event.id,
      eventType: eventType,
      startHour: startHour,
      start: (startHour * 60),
      endhour: endHour,
      end: (endHour * 60),
      days: 0,
      stages: 0,
      artists: 0,
      mostStages: 0,
      mostArtists: 0,
      time: false,
      parent: {
        event: [],
        series: [],
        artist: [],
        other: []
      },
      child: {
        event: [],
        artist: [],
        other: []
      }
    }
    await fetchFamily(event, eventInfo, div);
    if (full === true) {
      await fetchEventFamily(eventInfo, div);
      for (let i = 0; i < eventInfo.child.event.length; i++) {
        await fetchEventFamily(eventInfo.child.event[i], div);
      }
    }

    text += " done";
    //console.log(eventInfo)
    updateText("load", text);
    busy = false;
    if (eventInfo.eventType == "series") {
      //console.log("do nothing for series")
    } else {
      checkFestivalType(eventInfo, "container2")
    }
  }
  else {
    console.log("do nothing when busy")
  }
}
async function artiststuff(type, id, full, div) {
  if (busy === false) {
    busy = true;
    cycleCount = 0;
    text2 = "";
    updateText("container2", "");
    updateText("container3", "");
    const includes = 'aliases+artist-rels+place-rels+event-rels+series-rels'
    const artist = await fetchMusicBrainzExtended(type, id, includes);
    artistInfo = {
      name: artist.name,
      id: artist.id,
      lifeSpan: {},
      parent: {
        event: [],
        series: [],
        artist: [],
        other: []
      },
      child: {
        event: [],
        member: [],
        artist: [],
        instrument: [],
        other: []
      }
    }
    artistInfo.lifeSpan = await checkLifeSpan(artist);
    await fetchFamily(artist, artistInfo, div);
    checkMemberFunction(artistInfo, "container2");
    if (full === true) {
      await fetchArtistFamily(artistInfo, div);
      //createArtistEventList(artistInfo, "container4");
    }
    console.log(artistInfo);
    text += " done";
    updateText("load", text);
    busy = false;
    if (artistInfo
      && artistInfo.child
      && artistInfo.child.member[0]
      && artistInfo.child.member[0].parent
      && artistInfo.child.member[0].parent.artist[0]) {
      createArtistBandList(artistInfo, "container3");
    }
  }
  else {
    console.log("do nothing when busy")
  }
}

async function createSchedule(festival, div) {
  calender.startHour = festival.startHour - 1;
  if (festival.endHour > festival.startHour) {
    calender.endHour = festival.endHour + 1;
  } else {
    calender.endHour = festival.endHour + 24 + 1;
  }

  calender.start = calender.startHour * 60;
  calender.end = calender.endHour * 60;

  calender.length = (calender.end - calender.start);
  let checkLower = 0;

  let table = `<h1>schedule</h1><table><col/>`;
  for (a = 0; a < calender.length; a++) {
    table += `<col width="1px"/>`;
  }
  if (festival.festivalType != "oneDayOneStage") {
    table += `<tr><td id="festival">${festival.name}</td></tr>`;
  }

  const eventChild = festival.child.event; // days
  let eventChildAmount = eventChild.length;
  if ((festival.festivalType == "oneDayMultiStage") || (festival.festivalType == "oneDayOneStage")) {
    eventChildAmount = 1;
  }
  let eventChild2 = eventChild;
  let eventChild2Amount = eventChild.length
  for (let i = 0; i < eventChildAmount; i++) {
    if (festival.festivalType == "multiDayMultiStage") {
      table += `<tr><td>${(eventChild[i].name).replace((eventChild[i].parent.event[0].name) + ", ", "")}</td></tr>`;
      table += `<tr><td>time</td>`;
      for (let j = 0; j < (calender.length) / 60; j++) {
        if (calender.startHour + j < 24) {
          table += `<td colspan=60>${calender.startHour + j}</td>`
        } else {
          table += `<td colspan=60>${calender.startHour + j - 24}</td>`
        }
      }
      table += `</tr>`
      eventChild2 = eventChild[i].child.event; //stages
      eventChild2Amount = eventChild[i].child.event.length;
    } else {
      //for one day stuff
      table += `<tr><td>time</td>`;
      for (let j = 0; j < (calender.length) / 60; j++) {
        if (calender.startHour + j < 24) {
          table += `<td colspan=60>${calender.startHour + j}</td>`
        } else {
          table += `<td colspan=60>${calender.startHour + j - 24}</td>`
        }
      }
      table += `</tr>`
      if (festival.festivalType == "oneDayMultiStage") {
        eventChild2 = eventChild;
        eventChild2Amount = eventChild2.length;
      } else {
        eventChild2 = [festival];
        eventChild2Amount = 1;
      }
    }
    for (let k = 0; k < eventChild2Amount; k++) {
      if (eventChild2[k].child.artist.length === 0) {
        if (eventChild2[k].parent.event[0]) {
          table += `<tr><td id="stage">${(eventChild2[k].name).replace((eventChild2[k].parent.event[0].name) + ": ", "")}</td><td colspan='${calender.end - calender.start}'></td>`;
        }
        else {
          table += `<tr><td id="stage">${(eventChild2[k].name)}</td><td colspan='${calender.end - calender.start}'></td>`;
        }
      } else {
        const artistChild = eventChild2[k].child.artist.sort((a, b) => {
          if (a.start === b.start) {
            a.name = a.name + " + " + b.name;
          }
          return a.start - b.start
        });
        let cssId = "artist";
        if (eventChild2[k].parent.event[0]) {
          table += `<tr><td id="stage">${(eventChild2[k].name).replace((eventChild2[k].parent.event[0].name) + ": ", "")}</td><td colspan='${artistChild[0].start - calender.start}'></td>`;
        }
        else {
          table += `<tr><td id="stage">${(eventChild2[k].name)}</td><td colspan='${artistChild[0].start - calender.start}'></td>`;

        }
        for (let l = 0; l <= artistChild.length; l++) {
          if (artistChild[l]) {
            if (user.artist.liked.some(artist => artist.id === artistChild[l].id)) {
              cssId = "liked";
            } else {
              cssId = "artist";
            }
          }
          if (l === 0) {
            // eerste event
            table += `<td id="${cssId}" colspan=${artistChild[l].playTime}>${artistChild[l].name} ${artistChild[l].time}</td>`;
          }
          else if (l < artistChild.length) {
            if (artistChild[l].start === artistChild[l - 1].start) {
              //iets voor als er 2 artiesten met dezelfde tijd zijn
            } else {
              if (artistChild[l - 1].end != artistChild[l].start) {
                //witte ruimte als bands niet aaneensluitend zijn
                table += `<td colspan=${artistChild[l].start - artistChild[l - 1].end}></td>`;
              }
              table += `<td id="${cssId}" colspan=${artistChild[l].playTime}>${artistChild[l].name} ${artistChild[l].time}</td>`;
            }
          } else {
            //witte ruimte tot het einde
            table += `<td colspan=${calender.end - artistChild[l - 1].end}></td>`;
          }
        }
        table += `</tr>`
      }

    }
  }
  table += `</table>`;
  text3 = table;
  updateText(div, text3);
  scrollToTarget(div);
}
async function createList(festival, div) {
  let table = `<H1>list</H1><table>`;
  let cssId = "artist";
  let eventChild
  table += `<tr><td><B>${festival.name}<B></td><tr>`;
  if (festival.child.event.length != 0) {
    eventChild = festival.child.event;

    for (let j = 0; j < eventChild.length; j++) {
      if (eventChild[j].parent.event[0]) {
        const soortEvent = await nameCheck(eventChild[j].name);
        if (soortEvent == "festivalDay") {
          table += `<tr><td>${(eventChild[j].name).replace((eventChild[j].parent.event[0].name) + ", ", "")}</td>`;
        }
        else if (soortEvent == "festivalStage") {
          table += `<tr><td>${(eventChild[j].name).replace((eventChild[j].parent.event[0].name) + ": ", "")}</td>`;
        }
        else {
          table += `<tr><td>${eventChild[j].name}</td>`;
        }
      }
      if (eventChild[j].child.event.length > 0) {
        const eventChild2 = eventChild[j].child.event;
        for (let k = 0; k < eventChild2.length; k++) {
          table += `<tr><td>${(eventChild2[k].name).replace((eventChild2[k].parent.event[0].name) + ": ", "")}</td>`;
          const artistChild = eventChild2[k].child.artist.sort((a, b) => a.name.localeCompare(b.name));
          for (let l = 0; l < artistChild.length; l++) {
            if (user.artist.liked.some(artist => artist.id === artistChild[l].id)) {
              cssId = "liked";
            } else {
              cssId = "artist";
            }
            table += `<td id="${cssId}">${artistChild[l].name}</td>`;
          }
          table += `</tr>`;
        }
      }
      else {
        const artistChild = eventChild[j].child.artist.sort((a, b) => a.name.localeCompare(b.name));
        for (let l = 0; l < artistChild.length; l++) {
          if (user.artist.liked.some(artist => artist.id === artistChild[l].id)) {
            cssId = "liked";
          } else {
            cssId = "artist";
          }
          table += `<td id="${cssId}">${artistChild[l].name}</td>`;
        }
        table += '</tr>'
      }
    }
  }
  else {
    if (festival.child.artist.length != 0) {
      const artistChild = festival.child.artist.sort((a, b) => a.name.localeCompare(b.name));
      for (let l = 0; l < artistChild.length; l++) {
        if (user.artist.liked.some(artist => artist.id === artistChild[l].id)) {
          cssId = "liked";
        } else {
          cssId = "artist";
        }
        table += `<tr><td></td><td id="${cssId}">${artistChild[l].name}</td></tr>`;
      }
    }
  }
  table += '</table>';
  updateText(div, table);
  scrollToTarget(div);
}
function createBox(festival, div) {
  let table =
    `<table>
  <tr>
  <td>${festival.name}</td>
  </tr>
  </table>
  `;
  updateText(div, table);
  scrollToTarget(div);
}

async function createArtistBandList(artist, div) {
  let table = `<h1>artists member list</h1><table>`;
  let artistList = [];
  let newArtistList = "";
  let cssId = "member";
  table += `<tr><td><b>${artist.name}</b></td></tr>`;
  if (artist.child.member.length > 0) {
    const artistMember = artist.child.member.sort((a, b) => a.name.localeCompare(b.name));
    for (let i = 0; i < artistMember.length; i++) {

      if (artistMember[i].parent.artist.length > 0) {
        table += `<tr><td>${artistMember[i].name}</td></tr>`;
        const memberBand = artistMember[i].parent.artist.sort((a, b) => a.name.localeCompare(b.name));
        for (let l = 0; l < memberBand.length; l++) {
          table += `<tr><td></td><td>${memberBand[l].name}</td>`;
          const memberInstrument = memberBand[l].child.instrument;
          for (let k = 0; k < memberInstrument.length; k++) {
            table += `<td>${memberInstrument[k].name}</td>`
          }
          table += `</tr>`

          const double = artistList.findIndex(a => a.id === memberBand[l].id);
          if (double > -1) {
            console.log("doe nikske voor dubbele")
          } else {
            artistList.push(memberBand[l]);
          }
        }
      }
      else {
        if (artistMember[i].founder == true) {
          cssId = "founder";
        } else {
          cssId = "member";
        }
        table += `<tr><td id="${cssId}">${artistMember[i].name}</td>`;
        const memberInstrument = artistMember[i].child.instrument;
        for (let k = 0; k < memberInstrument.length; k++) {
          table += `<td>${memberInstrument[k].name} ${memberInstrument[k].begin} - ${memberInstrument[k].end}</td>`
        }
        table += '</tr>'
      }
    }
  }
  else {
    table += `<tr><td>no members yet</td></tr>`;
  }
  await artistList.sort((a, b) => a.name.localeCompare(b.name));
  for (let j = 0; j < artistList.length; j++) {
    newArtistList += `<button id="fetch" onclick="artiststuff('artist','${artistList[j].id}',false,'events2')">Fetch</button><button id="full" onclick="artiststuff('artist','${artistList[j].id}',true,'events2')">Full</button> ${artistList[j].name}<br>`;
  }
  updateText("events", newArtistList);
  updateText(div, table);
}

function createArtistInstrumentList(artist, div) {
  console.log(artist);
  const calender = {
    begin: artist.lifeSpan.begin,
    end: artist.lifeSpan.end,
    duration: artist.lifeSpan.end - artist.lifeSpan.begin + 1,
  }
  console.log(calender)
  const instrument = artist.child.instrument.sort((a, b) => a.name.localeCompare(b.name));
  let table = `<h1>artist instruments</h1><table id="fixed"><ol/>`;
  for (let i = 0; i < (calender.duration) * 4; i++) {
    table += `<col/>`;
  }

  table += `<tr><td><b>${artist.name}</b></td>`
  for (let i = 0; i < calender.duration; i++) {
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
          } else {
            table += `<tr>`;
          }
          for (let k = 0; k < groups[j].length; k++) {
            if (k === 0) {
              //eerst
              if (groups[j][k].begin == calender.begin) {
                //eerste = begin calender
                if (groups[j][k].end == calender.end) {
                  //eerste = begin calender && laatste = einde calender
                  table += `<td colspan="${((groups[j][k].end - groups[j][k].begin + 1) * 4)}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                } else {
                  //eerste = begin calender && einde != einde calender
                  if (groups[j].length>1) {
                    //er zijn volgende
                    table += `<td colspan="${((groups[j][k].end - groups[j][k].begin + 1) * 4)}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                  } else {
                    //geen volgende
                    table += `<td colspan="${((groups[j][k].end - groups[j][k].begin + 1) * 4)}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                    table += `<td colspan="${(calender.end - groups[j][k].end) * 4}></td>`
                  }

                }
              } else {
                //eerste != begin calender
                table += `<td colspan="${((groups[j][k].begin - calender.begin) * 4)}"></td>`; //empty voor eerste event
                if (k < groups[j].length - 1) {
                  //er is een volgende
                  if (groups[j][k].end == groups[j][k + 1].begin) {
                    //als einde  = volgende begin
                    if (groups[j][k + 1].begin == groups[j][k + 1].end) {
                      //volgend is 1 jaar lang
                      table += `<td><b>memmen</b></td>`
                    } else {
                      //volgende is langer dan 1 jaar
                      table += `<td colspan="${(((groups[j][k].end - groups[j][k].begin) + 1) * 4) - 2}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                    }
                  } else {
                    //volgende einde != begin
                    table += `<td colspan="${(((groups[j][k].end - groups[j][k].begin) + 1) * 4)}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                  }
                } else {
                  //er is geen volgende
                  table += `<td colspan="${(((groups[j][k].end - groups[j][k].begin) + 1) * 4)}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                  if (groups[j][k].end == calender.end) {
                    //do nothing on end of calander
                  } else {
                    table += `<td colspan="${(calender.end - groups[j][k].end) * 4}"></td>`
                  }
                }

              }
            }
            else {
              // niet eerst
              if (groups[j][k].begin == groups[j][k - 1].end) {
                //begin = einde vorige
                if (k < groups[j].length - 1) {
                  //er is een volgende
                  if (groups[j][k].end == groups[j][k + 1].begin) {
                    //einde = begin volgende
                    table += `<td colspan="${(groups[j][k].end - groups[j][k].begin) * 4}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                  } else {
                    //einde != begin volgende
                    if (groups[j][k].begin == groups[j][k].end) {
                      table += `<td colspan="2">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                    } else {
                      table += `<td colspan="${((groups[j][k].end - groups[j][k].begin) * 4)}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                    }
                  }

                } else {
                  //er is geen volgende
                  table += `<td colspan="${(((groups[j][k].end - groups[j][k].begin) + 1) * 4) - 2}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                }
              }
              else {
                //begin != einde voirge
                if ((groups[j][k].begin - 1) == groups[j][k - 1].end) {
                  //no space when years follow
                } else {
                  table += `<td colspan="${((groups[j][k].begin - groups[j][k - 1].end - 1) * 4)}"></td>`;
                }
                if (k < groups[j].length - 1) {
                  //er is een volgende
                  if (groups[j][k].end == groups[j][k + 1].begin) {
                    //einde = begin volgende
                    table += `<td colspan="${((groups[j][k].end - groups[j][k].begin) * 4) + 2}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                  } else {
                    //einde != begin volgende
                    table += `<td>${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                  }
                } else {
                  //er is geen volgende
                  table += `<td colspan="${(((groups[j][k].end - groups[j][k].begin) + 1) * 4)}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
                }
              }



              //niet eerste
              /*if ((groups[j][k].begin == groups[j][k - 1].end)) {
                table += `<td colspan="${((groups[j][k].end - groups[j][k].begin) * 4) + 2}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
              } else {
                table += `<td colspan="${(groups[j][k].begin - groups[j][k - 1].end) * 4}"></td>`;
                table += `<td colspan="${((groups[j][k].end - groups[j][k].begin) * 4) - 1}">${groups[j][k].name} ${groups[j][k].begin}-${groups[j][k].end}</td>`;
              }
            }*/
              if (k === groups[j].length - 1) {
                // table += `<td colspan="${((calender.end - groups[j][groups[j].length - 1].end) * 4) + 2}"></td>`;
              }
            }
          }
        }
        table += `</tr>`;
      }
    }
  }
  else {
    table += `<tr><td>no instruments yet</td></tr>`
  }
  table += `</table>`;
  updateText(div, table);
}
async function createArtistMemberList(artist, div) {
  let table = `<h1>artists members</h1><table><col/>`;
  let artistList = [];
  let newArtistList = "";
  let cssId = "member";
  const calender = {
    begin: artist.lifeSpan.begin,
    end: artist.lifeSpan.end,
    duration: artist.lifeSpan.end - artist.lifeSpan.begin,
  }
  for (let i = 0; i < calender.duration; i++) {
    table += `<col/>`;
  }
  table += `<tr><td><b>${artist.name}</b></td></tr>`;
  if (artist.child.member.length > 0) {
    const artistMember = artist.child.member.sort((a, b) => a.name.localeCompare(b.name));
    for (let i = 0; i < artistMember.length; i++) {
      if (artistMember[i].founder == true) {
        cssId = "founder";
      } else {
        cssId = "member";
      }
      table += `<tr><td id="${cssId}">${artistMember[i].name}</td>`;
      for (let i = 0; i < calender.duration; i++) {
        table += `<td>${calender.begin + i}</td>`;
      }
      table += `</tr>`;
      const memberInstrument = artistMember[i].child.instrument;
      for (let k = 0; k < memberInstrument.length; k++) {
        table += `<tr><td></td>`;
        if (memberInstrument[k].begin == calender.begin && memberInstrument[k].end == calender.end) {
          table += `<td colspan="${memberInstrument[k].end - memberInstrument[k].begin}">${memberInstrument[k].name} ${memberInstrument[k].begin} - ${memberInstrument[k].end}</td>`;
        }
        else {
          if (memberInstrument[k].begin > calender.begin) {
            table += `<td colspan="${memberInstrument[k].begin - calender.begin}"></td>`
          }
          if (memberInstrument[k].begin == calender.begin) {
            table += `<td colspan="${memberInstrument[k].end - calender.begin}">${memberInstrument[k].name} ${memberInstrument[k].begin} - ${memberInstrument[k].end}</td>`;
          } else {
            table += `<td colspan="${memberInstrument[k].end - memberInstrument[k].begin}">${memberInstrument[k].name} ${memberInstrument[k].begin} - ${memberInstrument[k].end}</td>`;
          }
          if (memberInstrument[k].end < calender.end) {
            table += `<td colspan="${calender.end - memberInstrument[k].end}"></td>`;
          }
        }

        table += `</tr>`
      }
    }
  }
  else {
    table += `<tr><td>no members yet</td></tr>`;
  }
  await artistList.sort((a, b) => a.name.localeCompare(b.name));
  for (let j = 0; j < artistList.length; j++) {
    newArtistList += `<button id="fetch" onclick="artiststuff('artist','${artistList[j].id}',false,'events2')">Fetch</button> ${artistList[j].name}<br>`;
  }
  updateText("events", newArtistList);
  updateText(div, table);
}
async function createArtistEventList(artist, div) {
  console.log(artist);
  let table = `<h1>event list</h1><table>`;
  table += `<tr><td><b>${artist.name}</b></td></tr>`;
  if (artist.parent.event.length > 0) {
    const event = artist.parent.event.sort((a, b) => a.lifeSpan.begin - b.lifeSpan.begin);
    for (let i = 0; i < event.length; i++) {
      table += `<tr><td>${event[i].lifeSpan.begin}</td><td>${event[i].name}</td></tr>`;
    }
  }
  else {
    table += `<tr><td>no events yet</td></tr>`;
  }
  table += '</table>';
  updateText(div, table);
  scrollToTarget(div);
}