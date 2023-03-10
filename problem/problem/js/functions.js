// G
// CODE According to specification
function click_filter_element(event) {
  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  event.currentTarget.classList.toggle("selected");
  update_programmes();
}

// G
// CODE according to specification
function create_filter_element(data) {
  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */
  let button = document.querySelector("button");
  button.classList.add(data.class);
  button.addEventListener("click", toggle_cities);

  const create_li = document.createElement("li");
  data.parent.append(create_li);
  create_li.classList.add(data.class);
  create_li.textContent = data.textContent;
  create_li.addEventListener("click", click_filter_element);

  return create_li;
}

// VG
// CODE according to specification
function add_group_toggling(filter_container_dom) {
  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */
}

// VG
// CODE according to specifications
function toggle_cities(event) {
  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */
  let all_selected_cities = document.querySelectorAll("#country_filter li");
  let button = document.querySelector("button");
  button.classList.toggle("selected");

  function test_function(button_selected) {
    if (button.classList !== "selected") {
      button_selected.classList.toggle("selected");
      update_programmes();
    }
  }

  array_each(all_selected_cities, test_function);
}

// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city

//    Create_countries_cities_filter
//Argument:
//This function does not have an argument

//Side effect:
//Med hj??lp av array each s?? anropas create_country och ??ven create_city.

//NO RETURN VALUE

//    Create_country
//Argument:
//Funktionen tar emot ett argument som heter country d??r country ??r en variabel f??r varje index som anv??nds i array_each.

//Side effect:
//Funktionen anv??nder sig av en variabel som heter dom, med hj??lp av dom s?? skapar vi divar som f??r klassen country, filter_container och ??ven ett id.
//Id och namnet ??ndras f??r varje index, eftersom vi anv??nder oss av varibeln country och sedan nycklen vi vill komma ??t.
//Funktionen anropar ??ven en test_function som returnerar ett city.ID som ??r samma som v??rt country.ID

//NO RETURN VALUE

//    Create_city
//Argument:
//Funktionen tar emot ett argument som heter city d??r cities(en array som vi sj??lv har skapat med hj??lp av array_filter) ??r en variabel som anv??nds f??r varje index i array_each.

//Side effect:
//Med hj??lp av create_filter_element s?? skapar vi ett obejekt som innerh??ller parent(queryselector), class(selected) och textContent(argumentet och nyckeln till namnet)
//dom.dataset.id = city.id hj??lper oss att placerar ut r??tt stad i r??tt land (numerisk ordning).

//NO RETURN VALUE
function create_countries_cities_filters() {
  function create_country(country) {
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);

    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;

    const cities = array_filter(CITIES, test_function);
    function test_function(city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city(city) {
    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;
  }

  array_each(COUNTRIES, create_country);
}

// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.

//Argument: Funktionen tar emot tv?? argument, type ??r d?? en varibel som h??nvisar parent till r??tt f??r??lder. DATA ??r d?? v??r LANGUAGES, SUBJECT, LEVELS.

//Side effect: Funktionen anropar create med hj??lp av array_each. Med hj??lp av create_filter_element s?? skapar vi nycklarna f??r v??ra arrayer.
//parent(querySelector(filter_type)), class(selected), textContent(data.name). D??r data blir DATA som ??ndras med hj??lp array_each.
//Funktion get ett data.id till objektet som ??r baserat p?? array.name.
//Funktionen anropas tre g??nger i index.js

//NO RETURN VALUE
function create_filters(type, DATA) {
  function create(data) {
    const create_dom = create_filter_element({
      parent: document.querySelector(`#${type}_filter > ul`),
      class: "selected",
      textContent: data.name,
    });
    create_dom.dataset.id = data.id;
  }
  array_each(DATA, create);
}
// G / VG (see details in specification)
// CODE according to specifications
// G / VG (see details in specification)
// CODE according to specifications
function create_programme(programme) {
  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */
  document.querySelector("#programmes > p").innerHTML = "";

  let sun_days = CITIES[UNIVERSITIES[programme.universityID].cityID].sun;

  let ul_dom = document.createElement("li");
  ul_parent = document.querySelector("#programmes >ul").append(ul_dom);
  ul_dom.classList.add("programme");
  ul_dom.innerHTML = `
  <div class="first_div">
  <li><b>${programme.name}</b></li>
  <li>${UNIVERSITIES[programme.universityID].name}</li>
  <li>${CITIES[UNIVERSITIES[programme.universityID].cityID].name}, ${
    COUNTRIES[CITIES[UNIVERSITIES[programme.universityID].cityID].countryID]
      .name
  }</li >
  <li>${LEVELS[programme.levelID - 1].name}, ${
    SUBJECTS[programme.subjectID].name
  }, ${LANGUAGES[programme.languageID].name}</li>
  </div>
  <div class="more_info"></div>
    <div class="bottom_programme">${
      CITIES[UNIVERSITIES[programme.universityID].cityID].name
    }, sun-index: ${
    CITIES[UNIVERSITIES[programme.universityID].cityID].sun
  } (${percenter(sun_days, 365)}%)</div>
    `;
}
array_each(PROGRAMMES, create_programme);

// G
// CODE according to the specification
function update_programmes() {
  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */

  let numbers_of_programmes = read_filters();
  let programmes_shown_before = document.querySelector("#programmes > ul");
  let programmes_paragraf = document.querySelector("#programmes > p");

  if (numbers_of_programmes.length === 0) {
    programmes_paragraf.innerHTML = "Inga program upfyller nuvarande filter.";
    programmes_shown_before.innerHTML = "";
  }
  array_each(numbers_of_programmes, create_programme);
}

// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it

//Argument:
//Funktionen tar inte emot n??got argument.

//Side effect:
// 1.Vi b??rjar med att skapa en variabel som ??r en referens till en nodelist som ??r alla selekterade li i country_filter.
// Vi anropar array_each med variabeln med nodelistan och en callback funktion.
// Detta generar en en array(city_id_selected)med nodelitstan plus nycklarna ID f??r varje element ??versatta till en str??ng.

// 2. Vi loopar igenom alla element i arryen skapad i den tidigare funktionen och skapar en ny variabel av varje index i arrayen.
// D??refter loopar UNIVERSITIES igenom och en ny variabel skapas f??r varje index.
// Dessa tv?? variablar j??mf??rs med deras ???Id???.
// Om dessa matchas pushas dom in i en ny array(universities).

// 3. En tom array deklareras (programmes).

// array_each anropas med parametrarna array(universities) och en callback funktion.
// I callbackfunktionen s?? skapas en ny variabel av varje index i och dess id.
// D??refter loopas PROGRAMMES och varje index blir en ny variabel(programme).
// Om varje index av PROGRAMMES nyckel ???id???, matchar med tidigare etablerad variabel av array(universities).
// Om funktionen returnerar true pushas (programme) in i (programmes).

// 4. Kommande tre funktioner g??r samma sak men med olika v??rden. (LEVELS, LANGUAGES, SUBJECTS)

// En ny variabel skapas med referens till en nodelist av selekterade li element fr??n vardera f??r??lder med namn baserat p?? de olika v??rden. (v??rdet_id_selected)

// En tom array deklareras. (v??rdet_id_selected)
// Via array_each anropas  (v??rder_dom_selected) och callback-funktion.
// Callback funtion omvandlar varje index i (v??rdet_id_selected) nyckelns id till en str??ng.

// (programmes) v??rde uppdateras genom array_filter som anropas med v??rdena (programmes) och test_funktionerna.
// Test funktionen returnerar varje index fr??n (level_id_selected) om den inkluderar (programmes).(v??rdet_id_selected).???s id.

// 5. En variabel deklareras som ??r en referens till input-elements v??rde. (search_string)
// Om variabelns v??rde ??r inte ??r tomt k??rs test function.

// Test function returnerar en ny array om index av (programmes) med nyckeln name inkluderas (search_string).
// (programmes) v??rde uppdateras genom array_filter som anropas med v??rdena (programmes och test_function).

//Funktionen returnerar programmes

function read_filters() {
  const city_selected_dom = document.querySelectorAll(
    "#country_filter li.selected"
  );

  const city_id_selected = [];
  function callback_add_cityID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes(university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);

  const level_selected_dom = document.querySelectorAll(
    "#level_filter li.selected"
  );
  const level_id_selected = [];
  function callback_add_levelID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level(programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);

  const language_selected_dom = document.querySelectorAll(
    "#language_filter li.selected"
  );
  const language_id_selected = [];
  function callback_add_languageID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);

  function test_function_language(programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);

  const subject_selected_dom = document.querySelectorAll(
    "#subject_filter li.selected"
  );
  const subject_id_selected = [];
  function callback_add_subjectID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);

  function test_function_subject(programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);

  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function(programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
