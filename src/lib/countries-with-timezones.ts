interface CountryData {
  value: string;
  label: string;
  timezones: string[];
}

const countriesWithTimezones: CountryData[] = [
  {
    value: "us",
    label: "United States",
    timezones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Anchorage", "Pacific/Honolulu", "America/Phoenix", "America/Puerto_Rico"]
  },
  {
    value: "gb",
    label: "United Kingdom",
    timezones: ["Europe/London"]
  },
  {
    value: "ca",
    label: "Canada",
    timezones: ["America/Toronto", "America/Vancouver", "America/Edmonton", "America/Halifax", "America/St_Johns", "America/Winnipeg", "America/Regina"]
  },
  {
    value: "au",
    label: "Australia",
    timezones: ["Australia/Sydney", "Australia/Melbourne", "Australia/Perth", "Australia/Brisbane", "Australia/Adelaide", "Australia/Darwin", "Australia/Hobart"]
  },
  {
    value: "nz",
    label: "New Zealand",
    timezones: ["Pacific/Auckland", "Pacific/Chatham"]
  },
  {
    value: "in",
    label: "India",
    timezones: ["Asia/Kolkata"]
  },
  {
    value: "jp",
    label: "Japan",
    timezones: ["Asia/Tokyo"]
  },
  {
    value: "cn",
    label: "China",
    timezones: ["Asia/Shanghai", "Asia/Urumqi"]
  },
  {
    value: "sg",
    label: "Singapore",
    timezones: ["Asia/Singapore"]
  },
  {
    value: "hk",
    label: "Hong Kong",
    timezones: ["Asia/Hong_Kong"]
  },
  {
    value: "kr",
    label: "South Korea",
    timezones: ["Asia/Seoul"]
  },
  {
    value: "ru",
    label: "Russia",
    timezones: [
      "Europe/Moscow",
      "Europe/Kaliningrad",
      "Europe/Samara",
      "Asia/Yekaterinburg",
      "Asia/Omsk",
      "Asia/Krasnoyarsk",
      "Asia/Irkutsk",
      "Asia/Yakutsk",
      "Asia/Vladivostok",
      "Asia/Magadan",
      "Asia/Kamchatka"
    ]
  },
  {
    value: "de",
    label: "Germany",
    timezones: ["Europe/Berlin"]
  },
  {
    value: "fr",
    label: "France",
    timezones: ["Europe/Paris"]
  },
  {
    value: "it",
    label: "Italy",
    timezones: ["Europe/Rome"]
  },
  {
    value: "es",
    label: "Spain",
    timezones: ["Europe/Madrid", "Atlantic/Canary"]
  },
  {
    value: "pt",
    label: "Portugal",
    timezones: ["Europe/Lisbon", "Atlantic/Azores", "Atlantic/Madeira"]
  },
  {
    value: "nl",
    label: "Netherlands",
    timezones: ["Europe/Amsterdam"]
  },
  {
    value: "be",
    label: "Belgium",
    timezones: ["Europe/Brussels"]
  },
  {
    value: "ie",
    label: "Ireland",
    timezones: ["Europe/Dublin"]
  },
  {
    value: "se",
    label: "Sweden",
    timezones: ["Europe/Stockholm"]
  },
  {
    value: "no",
    label: "Norway",
    timezones: ["Europe/Oslo"]
  },
  {
    value: "dk",
    label: "Denmark",
    timezones: ["Europe/Copenhagen"]
  },
  {
    value: "fi",
    label: "Finland",
    timezones: ["Europe/Helsinki"]
  },
  {
    value: "pl",
    label: "Poland",
    timezones: ["Europe/Warsaw"]
  },
  {
    value: "at",
    label: "Austria",
    timezones: ["Europe/Vienna"]
  },
  {
    value: "ch",
    label: "Switzerland",
    timezones: ["Europe/Zurich"]
  },
  {
    value: "gr",
    label: "Greece",
    timezones: ["Europe/Athens"]
  },
  {
    value: "tr",
    label: "Turkey",
    timezones: ["Europe/Istanbul"]
  },
  {
    value: "za",
    label: "South Africa",
    timezones: ["Africa/Johannesburg"]
  },
  {
    value: "ae",
    label: "United Arab Emirates",
    timezones: ["Asia/Dubai"]
  },
  {
    value: "il",
    label: "Israel",
    timezones: ["Asia/Jerusalem"]
  },
  {
    value: "sa",
    label: "Saudi Arabia",
    timezones: ["Asia/Riyadh"]
  },
  {
    value: "br",
    label: "Brazil",
    timezones: ["America/Sao_Paulo", "America/Manaus", "America/Bahia", "America/Fortaleza", "America/Noronha"]
  },
  {
    value: "mx",
    label: "Mexico",
    timezones: ["America/Mexico_City", "America/Tijuana", "America/Hermosillo", "America/Cancun"]
  },
  {
    value: "ar",
    label: "Argentina",
    timezones: ["America/Argentina/Buenos_Aires"]
  },
  {
    value: "cl",
    label: "Chile",
    timezones: ["America/Santiago", "Pacific/Easter"]
  },
  {
    value: "co",
    label: "Colombia",
    timezones: ["America/Bogota"]
  },
  {
    value: "pe",
    label: "Peru",
    timezones: ["America/Lima"]
  },
  {
    value: "ve",
    label: "Venezuela",
    timezones: ["America/Caracas"]
  },
  {
    value: "my",
    label: "Malaysia",
    timezones: ["Asia/Kuala_Lumpur"]
  },
  {
    value: "ph",
    label: "Philippines",
    timezones: ["Asia/Manila"]
  },
  {
    value: "id",
    label: "Indonesia",
    timezones: ["Asia/Jakarta", "Asia/Makassar", "Asia/Jayapura"]
  },
  {
    value: "th",
    label: "Thailand",
    timezones: ["Asia/Bangkok"]
  },
  {
    value: "vn",
    label: "Vietnam",
    timezones: ["Asia/Ho_Chi_Minh"]
  },
  {
    value: "pk",
    label: "Pakistan",
    timezones: ["Asia/Karachi"]
  },
  {
    value: "bd",
    label: "Bangladesh",
    timezones: ["Asia/Dhaka"]
  },
  {
    value: "eg",
    label: "Egypt",
    timezones: ["Africa/Cairo"]
  },
  {
    value: "ng",
    label: "Nigeria",
    timezones: ["Africa/Lagos"]
  },
  {
    value: "ke",
    label: "Kenya",
    timezones: ["Africa/Nairobi"]
  },
  {
    value: "ma",
    label: "Morocco",
    timezones: ["Africa/Casablanca"]
  },
  {
    value: "ua",
    label: "Ukraine",
    timezones: ["Europe/Kiev"]
  },
  {
    value: "ro",
    label: "Romania",
    timezones: ["Europe/Bucharest"]
  },
  {
    value: "by",
    label: "Belarus",
    timezones: ["Europe/Minsk"]
  },
  {
    value: "kz",
    label: "Kazakhstan",
    timezones: ["Asia/Almaty", "Asia/Aqtobe"]
  },
  {
    value: "cz",
    label: "Czech Republic",
    timezones: ["Europe/Prague"]
  },
  {
    value: "hu",
    label: "Hungary",
    timezones: ["Europe/Budapest"]
  },
  {
    value: "bg",
    label: "Bulgaria",
    timezones: ["Europe/Sofia"]
  },
  {
    value: "rs",
    label: "Serbia",
    timezones: ["Europe/Belgrade"]
  },
  {
    value: "hr",
    label: "Croatia",
    timezones: ["Europe/Zagreb"]
  },
  {
    value: "sk",
    label: "Slovakia",
    timezones: ["Europe/Bratislava"]
  },
  {
    value: "ee",
    label: "Estonia",
    timezones: ["Europe/Tallinn"]
  },
  {
    value: "lv",
    label: "Latvia",
    timezones: ["Europe/Riga"]
  },
  {
    value: "lt",
    label: "Lithuania",
    timezones: ["Europe/Vilnius"]
  },
  {
    value: "si",
    label: "Slovenia",
    timezones: ["Europe/Ljubljana"]
  },
  {
    value: "al",
    label: "Albania",
    timezones: ["Europe/Tirane"]
  },
  {
    value: "mk",
    label: "North Macedonia",
    timezones: ["Europe/Skopje"]
  },
  {
    value: "ba",
    label: "Bosnia and Herzegovina",
    timezones: ["Europe/Sarajevo"]
  },
  {
    value: "me",
    label: "Montenegro",
    timezones: ["Europe/Podgorica"]
  },
  {
    value: "xk",
    label: "Kosovo",
    timezones: ["Europe/Belgrade"]  // Kosovo uses the same timezone as Serbia
  }
];

export default countriesWithTimezones;
