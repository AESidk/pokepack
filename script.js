const boosterPack=document.getElementById("boosterPack")
const openPackBtn=document.getElementById("openPackBtn")
const cardStack=document.getElementById("cardStack")
const cardsContainer=document.getElementById("cardsContainer")
const resetBtn=document.getElementById("resetBtn")
const pokedexGrid=document.getElementById("pokedexGrid")
const pokedexContainer=document.getElementById("pokedexContainer")
const pokedexIcon=document.getElementById("pokedexIcon")
const closePokedex=document.getElementById("closePokedex")
let cards=document.querySelectorAll(".booster-pack")
let collectedPokemons=JSON.parse(localStorage.getItem("myPokemons")) || {}

//типы карт
const cardTypes=[
    {
        type:"common",
        class:"common-card",
        probability:0.40,
        arts:[
            "pikachu","crawdaunt","magikarp","bulbasaur","squirtle","zubat","doduo","dewgong","froakie","pancham","pineco","granbull","bonsly","shedinja","corphish","phantump","pinsir","zeraora","cutiefly"
        ]
    },
    {
        type:"uncommon",
        class:"uncommon-card",
        probability:0.30,
        arts:[
            "fuecoco","kingambit","machoke","psyduck","chandelure","nidoking","golem","dodrio","frogadier","tapu-bulu","abra","sudowoodo","zigzagoon","bronzor","vanillite","tauros","onix","zangoose","garganacl","garchomp",
        ]
    },
    {
        type:"epic",
        class:"epic-card",
        probability:0.15,
        arts:[
            "snorlax","chimecho","scizor","gengar","hypno","umbreon","espeon","pangoro","kadabra","mew","suicune","mawile","conkeldurr","cofagrigus","krookodile","trevenant","grafaiai","tinkaton"
        ]
    },
    {
        type:"legendary",
        class:"legendary-card",
        probability:0.07,
        arts:[
            "dragapult","blastoise","alakazam","raikou","entei","aggron","yveltal","buzzwole","darkrai","landorus","lugia","celesteela","zoroark"
        
        ]
    },
    {
        type:"mythik",
        class:"mythik-card",
        probability:0.03,
        arts:[
            "charizard","solgaleo","falinks","victreebel","gyarados","greninja","mewtwo","reshiram","rayquaza","arceus","alcremie"
                  
        ]

    }
    
        
    
]
let currentPack=[]
let revealedCards=0

const pokemonTypes = {
            'bulbasaur': ['grass', 'poison'],
            'ivysaur': ['grass', 'poison'],
            'venusaur': ['grass', 'poison'],
            'charmander': ['fire'],
            'charmeleon': ['fire'],
            'charizard': ['fire', 'flying'],
            'squirtle': ['water'],
            'wartortle': ['water'],
            'blastoise': ['water'],
            'caterpie': ['bug'],
            'metapod': ['bug'],
            'butterfree': ['bug', 'flying'],
            'weedle': ['bug', 'poison'],
            'kakuna': ['bug', 'poison'],
            'beedrill': ['bug', 'poison'],
            'pidgey': ['normal', 'flying'],
            'pidgeotto': ['normal', 'flying'],
            'pidgeot': ['normal', 'flying'],
            'rattata': ['normal'],
            'raticate': ['normal'],
            'spearow': ['normal', 'flying'],
            'fearow': ['normal', 'flying'],
            'ekans': ['poison'],
            'arbok': ['poison'],
            'pikachu': ['electric'],
            'raichu': ['electric'],
            'sandshrew': ['ground'],
            'sandslash': ['ground'],
            'nidoran-f': ['poison'],
            'nidorina': ['poison'],
            'nidoqueen': ['poison', 'ground'],
            'nidoran-m': ['poison'],
            'nidorino': ['poison'],
            'nidoking': ['poison', 'ground'],
            'clefairy': ['fairy'],
            'clefable': ['fairy'],
            'vulpix': ['fire'],
            'ninetales': ['fire'],
            'jigglypuff': ['normal', 'fairy'],
            'wigglytuff': ['normal', 'fairy'],
            'zubat': ['poison', 'flying'],
            'golbat': ['poison', 'flying'],
            'oddish': ['grass', 'poison'],
            'gloom': ['grass', 'poison'],
            'vileplume': ['grass', 'poison'],
            'paras': ['bug', 'grass'],
            'parasect': ['bug', 'grass'],
            'venonat': ['bug', 'poison'],
            'venomoth': ['bug', 'poison'],
            'diglett': ['ground'],
            'dugtrio': ['ground'],
            'meowth': ['normal'],
            'persian': ['normal'],
            'psyduck': ['water'],
            'golduck': ['water'],
            'mankey': ['fighting'],
            'primeape': ['fighting'],
            'growlithe': ['fire'],
            'arcanine': ['fire'],
            'poliwag': ['water'],
            'poliwhirl': ['water'],
            'poliwrath': ['water', 'fighting'],
            'abra': ['psychic'],
            'kadabra': ['psychic'],
            'alakazam': ['psychic'],
            'machop': ['fighting'],
            'machoke': ['fighting'],
            'machamp': ['fighting'],
            'bellsprout': ['grass', 'poison'],
            'weepinbell': ['grass', 'poison'],
            'victreebel': ['grass', 'poison'],
            'tentacool': ['water', 'poison'],
            'tentacruel': ['water', 'poison'],
            'geodude': ['rock', 'ground'],
            'graveler': ['rock', 'ground'],
            'golem': ['rock', 'ground'],
            'ponyta': ['fire'],
            'rapidash': ['fire'],
            'slowpoke': ['water', 'psychic'],
            'slowbro': ['water', 'psychic'],
            'magnemite': ['electric', 'steel'],
            'magneton': ['electric', 'steel'],
            'farfetchd': ['normal', 'flying'],
            'doduo': ['normal', 'flying'],
            'dodrio': ['normal', 'flying'],
            'seel': ['water'],
            'dewgong': ['water', 'ice'],
            'grimer': ['poison'],
            'muk': ['poison'],
            'shellder': ['water'],
            'cloyster': ['water', 'ice'],
            'gastly': ['ghost', 'poison'],
            'haunter': ['ghost', 'poison'],
            'gengar': ['ghost', 'poison'],
            'onix': ['rock', 'ground'],
            'drowzee': ['psychic'],
            'hypno': ['psychic'],
            'krabby': ['water'],
            'kingler': ['water'],
            'voltorb': ['electric'],
            'electrode': ['electric'],
            'exeggcute': ['grass', 'psychic'],
            'exeggutor': ['grass', 'psychic'],
            'cubone': ['ground'],
            'marowak': ['ground'],
            'hitmonlee': ['fighting'],
            'hitmonchan': ['fighting'],
            'lickitung': ['normal'],
            'koffing': ['poison'],
            'weezing': ['poison'],
            'rhyhorn': ['ground', 'rock'],
            'rhydon': ['ground', 'rock'],
            'chansey': ['normal'],
            'tangela': ['grass'],
            'kangaskhan': ['normal'],
            'horsea': ['water'],
            'seadra': ['water'],
            'goldeen': ['water'],
            'seaking': ['water'],
            'staryu': ['water'],
            'starmie': ['water', 'psychic'],
            'mr-mime': ['psychic', 'fairy'],
            'scyther': ['bug', 'flying'],
            'jynx': ['ice', 'psychic'],
            'electabuzz': ['electric'],
            'magmar': ['fire'],
            'pinsir': ['bug'],
            'tauros': ['normal'],
            'magikarp': ['water'],
            'gyarados': ['water', 'flying'],
            'lapras': ['water', 'ice'],
            'ditto': ['normal'],
            'eevee': ['normal'],
            'vaporeon': ['water'],
            'jolteon': ['electric'],
            'flareon': ['fire'],
            'porygon': ['normal'],
            'omanyte': ['rock', 'water'],
            'omastar': ['rock', 'water'],
            'kabuto': ['rock', 'water'],
            'kabutops': ['rock', 'water'],
            'aerodactyl': ['rock', 'flying'],
            'snorlax': ['normal'],
            'articuno': ['ice', 'flying'],
            'zapdos': ['electric', 'flying'],
            'moltres': ['fire', 'flying'],
            'dratini': ['dragon'],
            'dragonair': ['dragon'],
            'dragonite': ['dragon', 'flying'],
            'mewtwo': ['psychic'],
            'mew': ['psychic'],
            'chikorita': ['grass'],
            'bayleef': ['grass'],
            'meganium': ['grass'],
            'cyndaquil': ['fire'],
            'quilava': ['fire'],
            'typhlosion': ['fire'],
            'totodile': ['water'],
            'croconaw': ['water'],
            'feraligatr': ['water'],
            'sentret': ['normal'],
            'furret': ['normal'],
            'hoothoot': ['normal', 'flying'],
            'noctowl': ['normal', 'flying'],
            'ledyba': ['bug', 'flying'],
            'ledian': ['bug', 'flying'],
            'spinarak': ['bug', 'poison'],
            'ariados': ['bug', 'poison'],
            'crobat': ['poison', 'flying'],
            'chinchou': ['water', 'electric'],
            'lanturn': ['water', 'electric'],
            'pichu': ['electric'],
            'cleffa': ['fairy'],
            'igglybuff': ['normal', 'fairy'],
            'togepi': ['fairy'],
            'togetic': ['fairy', 'flying'],
            'natu': ['psychic', 'flying'],
            'xatu': ['psychic', 'flying'],
            'mareep': ['electric'],
            'flaaffy': ['electric'],
            'ampharos': ['electric'],
            'bellossom': ['grass'],
            'marill': ['water', 'fairy'],
            'azumarill': ['water', 'fairy'],
            'sudowoodo': ['rock'],
            'politoed': ['water'],
            'hoppip': ['grass', 'flying'],
            'skiploom': ['grass', 'flying'],
            'jumpluff': ['grass', 'flying'],
            'aipom': ['normal'],
            'sunkern': ['grass'],
            'sunflora': ['grass'],
            'yanma': ['bug', 'flying'],
            'wooper': ['water', 'ground'],
            'quagsire': ['water', 'ground'],
            'espeon': ['psychic'],
            'umbreon': ['dark'],
            'murkrow': ['dark', 'flying'],
            'slowking': ['water', 'psychic'],
            'misdreavus': ['ghost'],
            'unown': ['psychic'],
            'wobbuffet': ['psychic'],
            'girafarig': ['normal', 'psychic'],
            'pineco': ['grass'],
            'forretress': ['bug', 'steel'],
            'dunsparce': ['normal'],
            'gligar': ['ground', 'flying'],
            'steelix': ['steel', 'ground'],
            'snubbull': ['fairy'],
            'granbull': ['fairy'],
            'qwilfish': ['water', 'poison'],
            'scizor': ['bug', 'steel'],
            'shuckle': ['bug', 'rock'],
            'heracross': ['bug', 'fighting'],
            'sneasel': ['dark', 'ice'],
            'teddiursa': ['normal'],
            'ursaring': ['normal'],
            'slugma': ['fire'],
            'magcargo': ['fire', 'rock'],
            'swinub': ['ice', 'ground'],
            'piloswine': ['ice', 'ground'],
            'corsola': ['water', 'rock'],
            'remoraid': ['water'],
            'octillery': ['water'],
            'delibird': ['ice', 'flying'],
            'mantine': ['water', 'flying'],
            'skarmory': ['steel', 'flying'],
            'houndour': ['dark', 'fire'],
            'houndoom': ['dark', 'fire'],
            'kingdra': ['water', 'dragon'],
            'phanpy': ['ground'],
            'donphan': ['ground'],
            'porygon2': ['normal'],
            'stantler': ['normal'],
            'smeargle': ['normal'],
            'tyrogue': ['fighting'],
            'hitmontop': ['fighting'],
            'smoochum': ['ice', 'psychic'],
            'elekid': ['electric'],
            'magby': ['fire'],
            'miltank': ['normal'],
            'blissey': ['normal'],
            'raikou': ['electric'],
            'entei': ['fire'],
            'suicune': ['water'],
            'larvitar': ['rock', 'ground'],
            'pupitar': ['rock', 'ground'],
            'tyranitar': ['rock', 'dark'],
            'lugia': ['psychic', 'flying'],
            'ho-oh': ['fire', 'flying'],
            'celebi': ['psychic', 'grass'],
            'treecko': ['grass'],
            'grovyle': ['grass'],
            'sceptile': ['grass'],
            'torchic': ['fire'],
            'combusken': ['fire', 'fighting'],
            'blaziken': ['fire', 'fighting'],
            'mudkip': ['water'],
            'marshtomp': ['water', 'ground'],
            'swampert': ['water', 'ground'],
            'poochyena': ['dark'],
            'mightyena': ['dark'],
            'zigzagoon': ['normal'],
            'linoone': ['normal'],
            'wurmple': ['bug'],
            'silcoon': ['bug'],
            'beautifly': ['bug', 'flying'],
            'cascoon': ['bug'],
            'dustox': ['bug', 'poison'],
            'lotad': ['water', 'grass'],
            'lombre': ['water', 'grass'],
            'ludicolo': ['water', 'grass'],
            'seedot': ['grass'],
            'nuzleaf': ['grass', 'dark'],
            'shiftry': ['grass', 'dark'],
            'taillow': ['normal', 'flying'],
            'swellow': ['normal', 'flying'],
            'wingull': ['water', 'flying'],
            'pelipper': ['water', 'flying'],
            'ralts': ['psychic', 'fairy'],
            'kirlia': ['psychic', 'fairy'],
            'gardevoir': ['psychic', 'fairy'],
            'surskit': ['bug', 'water'],
            'masquerain': ['bug', 'flying'],
            'shroomish': ['grass'],
            'breloom': ['grass', 'fighting'],
            'slakoth': ['normal'],
            'vigoroth': ['normal'],
            'slaking': ['normal'],
            'nincada': ['bug', 'ground'],
            'ninjask': ['bug', 'flying'],
            'shedinja': ['bug', 'ghost'],
            'whismur': ['normal'],
            'loudred': ['normal'],
            'exploud': ['normal'],
            'makuhita': ['fighting'],
            'hariyama': ['fighting'],
            'azurill': ['normal', 'fairy'],
            'nosepass': ['rock'],
            'skitty': ['normal'],
            'delcatty': ['normal'],
            'sableye': ['dark', 'ghost'],
            'mawile': ['steel', 'fairy'],
            'aron': ['steel', 'rock'],
            'lairon': ['steel', 'rock'],
            'aggron': ['steel', 'rock'],
            'meditite': ['fighting', 'psychic'],
            'medicham': ['fighting', 'psychic'],
            'electrike': ['electric'],
            'manectric': ['electric'],
            'plusle': ['electric'],
            'minun': ['electric'],
            'volbeat': ['bug'],
            'illumise': ['bug'],
            'roselia': ['grass', 'poison'],
            'gulpin': ['poison'],
            'swalot': ['poison'],
            'carvanha': ['water', 'dark'],
            'sharpedo': ['water', 'dark'],
            'wailmer': ['water'],
            'wailord': ['water'],
            'numel': ['fire', 'ground'],
            'camerupt': ['fire', 'ground'],
            'torkoal': ['fire'],
            'spoink': ['psychic'],
            'grumpig': ['psychic'],
            'spinda': ['normal'],
            'trapinch': ['ground'],
            'vibrava': ['ground', 'dragon'],
            'flygon': ['ground', 'dragon'],
            'cacnea': ['grass'],
            'cacturne': ['grass', 'dark'],
            'swablu': ['normal', 'flying'],
            'altaria': ['dragon', 'flying'],
            'zangoose': ['normal'],
            'seviper': ['poison'],
            'lunatone': ['rock', 'psychic'],
            'solrock': ['rock', 'psychic'],
            'barboach': ['water', 'ground'],
            'whiscash': ['water', 'ground'],
            'corphish': ['water'],
            'crawdaunt': ['water', 'dark'],
            'baltoy': ['ground', 'psychic'],
            'claydol': ['ground', 'psychic'],
            'lileep': ['rock', 'grass'],
            'cradily': ['rock', 'grass'],
            'anorith': ['rock', 'bug'],
            'armaldo': ['rock', 'bug'],
            'feebas': ['water'],
            'milotic': ['water'],
            'castform': ['normal'],
            'kecleon': ['normal'],
            'shuppet': ['ghost'],
            'banette': ['ghost'],
            'duskull': ['ghost'],
            'dusclops': ['ghost'],
            'tropius': ['grass', 'flying'],
            'chimecho': ['psychic'],
            'absol': ['dark'],
            'wynaut': ['psychic'],
            'snorunt': ['ice'],
            'glalie': ['ice'],
            'spheal': ['ice', 'water'],
            'sealeo': ['ice', 'water'],
            'walrein': ['ice', 'water'],
            'clamperl': ['water'],
            'huntail': ['water'],
            'gorebyss': ['water'],
            'relicanth': ['water', 'rock'],
            'luvdisc': ['water'],
            'bagon': ['dragon'],
            'shelgon': ['dragon'],
            'salamence': ['dragon', 'flying'],
            'beldum': ['steel', 'psychic'],
            'metang': ['steel', 'psychic'],
            'metagross': ['steel', 'psychic'],
            'regirock': ['rock'],
            'regice': ['ice'],
            'registeel': ['steel'],
            'latias': ['dragon', 'psychic'],
            'latios': ['dragon', 'psychic'],
            'kyogre': ['water'],
            'groudon': ['ground'],
            'rayquaza': ['dragon', 'flying'],
            'jirachi': ['steel', 'psychic'],
            'deoxys': ['psychic'],
            'phantump':['ghost'],
            'zeraora':['electric'],
            'cutiefly':['bug'],
            'fuecoco':['fire'],
            'chandelure':['ghost'],
            'frogadier':['water'],
            'vanillite':['ice'],
            'conkeldurr':['rock'],
            'cofagrigus':['dark'],
            'grafaiai':['poison'],
            'dragapult':['dragon','flying'],
            'darkrai':['dark'],
            'greninja':['water','fighting'],
            'reshiram':['dragon'],
            'buzzwole':['bug','fighting'],
            'solgaleo':['steel','fighting'],
            'arceus':['steel'],
            'falinks':['steel'],
        };

function getPokemonImageUrl(pokemonName){
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${getPokedexNumber(pokemonName)}.png`;
}
function getPokedexNumber(pokemonName) {
            const pokedexNumbers = {
                'bulbasaur': '001', 'ivysaur': '002', 'venusaur': '003', 'charmander': '004', 'charmeleon': '005',
                'charizard': '006', 'squirtle': '007', 'wartortle': '008', 'blastoise': '009', 'caterpie': '010',
                'metapod': '011', 'butterfree': '012', 'weedle': '013', 'kakuna': '014', 'beedrill': '015',
                'pidgey': '016', 'pidgeotto': '017', 'pidgeot': '018', 'rattata': '019', 'raticate': '020',
                'spearow': '021', 'fearow': '022', 'ekans': '023', 'arbok': '024', 'pikachu': '025',
                'raichu': '026', 'sandshrew': '027', 'sandslash': '028', 'nidoran-f': '029', 'nidorina': '030',
                'nidoqueen': '031', 'nidoran-m': '032', 'nidorino': '033', 'nidoking': '034', 'clefairy': '035',
                'clefable': '036', 'vulpix': '037', 'ninetales': '038', 'jigglypuff': '039', 'wigglytuff': '040',
                'zubat': '041', 'golbat': '042', 'oddish': '043', 'gloom': '044', 'vileplume': '045',
                'paras': '046', 'parasect': '047', 'venonat': '048', 'venomoth': '049', 'diglett': '050',
                'dugtrio': '051', 'meowth': '052', 'persian': '053', 'psyduck': '054', 'golduck': '055',
                'mankey': '056', 'primeape': '057', 'growlithe': '058', 'arcanine': '059', 'poliwag': '060',
                'poliwhirl': '061', 'poliwrath': '062', 'abra': '063', 'kadabra': '064', 'alakazam': '065',
                'machop': '066', 'machoke': '067', 'machamp': '068', 'bellsprout': '069', 'weepinbell': '070',
                'victreebel': '071', 'tentacool': '072', 'tentacruel': '073', 'geodude': '074', 'graveler': '075',
                'golem': '076', 'ponyta': '077', 'rapidash': '078', 'slowpoke': '079', 'slowbro': '080',
                'magnemite': '081', 'magneton': '082', 'farfetchd': '083', 'doduo': '084', 'dodrio': '085',
                'seel': '086', 'dewgong': '087', 'grimer': '088', 'muk': '089', 'shellder': '090',
                'cloyster': '091', 'gastly': '092', 'haunter': '093', 'gengar': '094', 'onix': '095',
                'drowzee': '096', 'hypno': '097', 'krabby': '098', 'kingler': '099', 'voltorb': '100',
                'electrode': '101', 'exeggcute': '102', 'exeggutor': '103', 'cubone': '104', 'marowak': '105',
                'hitmonlee': '106', 'hitmonchan': '107', 'lickitung': '108', 'koffing': '109', 'weezing': '110',
                'rhyhorn': '111', 'rhydon': '112', 'chansey': '113', 'tangela': '114', 'kangaskhan': '115',
                'horsea': '116', 'seadra': '117', 'goldeen': '118', 'seaking': '119', 'staryu': '120',
                'starmie': '121', 'mr-mime': '122', 'scyther': '123', 'jynx': '124', 'electabuzz': '125',
                'magmar': '126', 'pinsir': '127', 'tauros': '128', 'magikarp': '129', 'gyarados': '130',
                'lapras': '131', 'ditto': '132', 'eevee': '133', 'vaporeon': '134', 'jolteon': '135',
                'flareon': '136', 'porygon': '137', 'omanyte': '138', 'omastar': '139', 'kabuto': '140',
                'kabutops': '141', 'aerodactyl': '142', 'snorlax': '143', 'articuno': '144', 'zapdos': '145',
                'moltres': '146', 'dratini': '147', 'dragonair': '148', 'dragonite': '149', 'mewtwo': '150',
                'mew': '151', 'chikorita': '152', 'bayleef': '153', 'meganium': '154', 'cyndaquil': '155',
                'quilava': '156', 'typhlosion': '157', 'totodile': '158', 'croconaw': '159', 'feraligatr': '160',
                'sentret': '161', 'furret': '162', 'hoothoot': '163', 'noctowl': '164', 'ledyba': '165',
                'ledian': '166', 'spinarak': '167', 'ariados': '168', 'crobat': '169', 'chinchou': '170',
                'lanturn': '171', 'pichu': '172', 'cleffa': '173', 'igglybuff': '174', 'togepi': '175',
                'togetic': '176', 'natu': '177', 'xatu': '178', 'mareep': '179', 'flaaffy': '180',
                'ampharos': '181', 'bellossom': '182', 'marill': '183', 'azumarill': '184', 'sudowoodo': '185',
                'politoed': '186', 'hoppip': '187', 'skiploom': '188', 'jumpluff': '189', 'aipom': '190',
                'sunkern': '191', 'sunflora': '192', 'yanma': '193', 'wooper': '194', 'quagsire': '195',
                'espeon': '196', 'umbreon': '197', 'murkrow': '198', 'slowking': '199', 'misdreavus': '200',
                'unown': '201', 'wobbuffet': '202', 'girafarig': '203', 'pineco': '204', 'forretress': '205',
                'dunsparce': '206', 'gligar': '207', 'steelix': '208', 'snubbull': '209', 'granbull': '210',
                'qwilfish': '211', 'scizor': '212', 'shuckle': '213', 'heracross': '214', 'sneasel': '215',
                'teddiursa': '216', 'ursaring': '217', 'slugma': '218', 'magcargo': '219', 'swinub': '220',
                'piloswine': '221', 'corsola': '222', 'remoraid': '223', 'octillery': '224', 'delibird': '225',
                'mantine': '226', 'skarmory': '227', 'houndour': '228', 'houndoom': '229', 'kingdra': '230',
                'phanpy': '231', 'donphan': '232', 'porygon2': '233', 'stantler': '234', 'smeargle': '235',
                'tyrogue': '236', 'hitmontop': '237', 'smoochum': '238', 'elekid': '239', 'magby': '240',
                'miltank': '241', 'blissey': '242', 'raikou': '243', 'entei': '244', 'suicune': '245',
                'larvitar': '246', 'pupitar': '247', 'tyranitar': '248', 'lugia': '249', 'ho-oh': '250',
                'celebi': '251', 'treecko': '252', 'grovyle': '253', 'sceptile': '254', 'torchic': '255',
                'combusken': '256', 'blaziken': '257', 'mudkip': '258', 'marshtomp': '259', 'swampert': '260',
                'poochyena': '261', 'mightyena': '262', 'zigzagoon': '263', 'linoone': '264', 'wurmple': '265',
                'silcoon': '266', 'beautifly': '267', 'cascoon': '268', 'dustox': '269', 'lotad': '270',
                'lombre': '271', 'ludicolo': '272', 'seedot': '273', 'nuzleaf': '274', 'shiftry': '275',
                'taillow': '276', 'swellow': '277', 'wingull': '278', 'pelipper': '279', 'ralts': '280',
                'kirlia': '281', 'gardevoir': '282', 'surskit': '283', 'masquerain': '284', 'shroomish': '285',
                'breloom': '286', 'slakoth': '287', 'vigoroth': '288', 'slaking': '289', 'nincada': '290',
                'ninjask': '291', 'shedinja': '292', 'whismur': '293', 'loudred': '294', 'exploud': '295',
                'makuhita': '296', 'hariyama': '297', 'azurill': '298', 'nosepass': '299', 'skitty': '300',
                'delcatty': '301', 'sableye': '302', 'mawile': '303', 'aron': '304', 'lairon': '305',
                'aggron': '306', 'meditite': '307', 'medicham': '308', 'electrike': '309', 'manectric': '310',
                'plusle': '311', 'minun': '312', 'volbeat': '313', 'illumise': '314', 'roselia': '315',
                'gulpin': '316', 'swalot': '317', 'carvanha': '318', 'sharpedo': '319', 'wailmer': '320',
                'wailord': '321', 'numel': '322', 'camerupt': '323', 'torkoal': '324', 'spoink': '325',
                'grumpig': '326', 'spinda': '327', 'trapinch': '328', 'vibrava': '329', 'flygon': '330',
                'cacnea': '331', 'cacturne': '332', 'swablu': '333', 'altaria': '334', 'zangoose': '335',
                'seviper': '336', 'lunatone': '337', 'solrock': '337', 'barboach': '339', 'whiscash': '340',
                'corphish': '341', 'crawdaunt': '342', 'baltoy': '343', 'claydol': '344', 'lileep': '345',
                'cradily': '346', 'anorith': '347', 'armaldo': '348', 'feebas': '349', 'milotic': '350',
                'castform': '351', 'kecleon': '352', 'shuppet': '353', 'banette': '354', 'duskull': '355',
                'dusclops': '356', 'tropius': '357', 'chimecho': '358', 'absol': '359', 'wynaut': '360',
                'snorunt': '361', 'glalie': '362', 'spheal': '363', 'sealeo': '364', 'walrein': '365',
                'clamperl': '366', 'huntail': '367', 'gorebyss': '368', 'relicanth': '369', 'luvdisc': '370',
                'bagon': '371', 'shelgon': '372', 'salamence': '373', 'beldum': '374', 'metang': '375',
                'metagross': '376', 'regirock': '377', 'regice': '378', 'registeel': '379', 'latias': '380',
                'latios': '381', 'kyogre': '382', 'groudon': '383', 'rayquaza': '384', 'jirachi': '385',
                'deoxys': '386', 'turtwig': '387', 'grotle': '388', 'torterra': '389', 'chimchar': '390',
                'monferno': '391', 'infernape': '392', 'piplup': '393', 'prinplup': '394', 'empoleon': '395',
                'starly': '396', 'staravia': '397', 'staraptor': '398', 'bidoof': '399', 'bibarel': '400',
                'kricketot': '401', 'kricketune': '402', 'shinx': '403', 'luxio': '404', 'luxray': '405',
                'cranidos': '406', 'rampardos': '407', 'shieldon': '408', 'bastiodon': '409', 'burmy': '410',
                'wormadam': '411', 'mothim': '412', 'combee': '413', 'vespiquen': '414', 'pachirisu': '415',
                'buizel': '416', 'floatzel': '417', 'cherubi': '418', 'cherrim': '419', 'shellos': '420',
                'gastrodon': '421', 'ambipom': '422', 'drifloon': '423', 'drifblim': '424', 'buneary': '425',
                'lopunny': '426', 'mismagius': '427', 'honchkrow': '428', 'glameow': '429', 'purugly': '430',
                'chingling': '431', 'stunky': '432', 'skuntank': '433', 'bronzor': '434', 'bronzong': '435',
                'bonsly': '436', 'mime-jr': '437', 'happiny': '438', 'chatot': '439', 'spiritomb': '440',
                'gible': '441', 'gabite': '442', 'garchomp': '443', 'munchlax': '444', 'riolu': '445',
                'lucario': '446', 'hippopotas': '447', 'hippowdon': '448', 'skorupi': '449', 'drapion': '450',
                'croagunk': '451', 'toxicroak': '452', 'carnivine': '453', 'finneon': '454', 'lumineon': '455',
                'mantyke': '456', 'snover': '457', 'abomasnow': '458', 'weavile': '459', 'magnezone': '460',
                'lickilicky': '461', 'rhyperior': '462', 'tangrowth': '463', 'electivire': '464', 'magmortar': '465',
                'togekiss': '466', 'yanmega': '467', 'leafeon': '468', 'glaceon': '469', 'gliscor': '470',
                'mamoswine': '471', 'porygon-z': '472', 'gallade': '473', 'probopass': '474', 'dusknoir': '475',
                'froslass': '476', 'rotom': '477', 'uxie': '480', 'mesprit': '481', 'azelf': '482',
                'dialga': '483', 'palkia': '484', 'heatran': '485', 'regigigas': '486', 'giratina': '487',
                'cresselia': '488', 'phione': '489', 'manaphy': '490', 'darkrai': '491', 'shaymin': '492',
                'arceus': '493', 'victini': '494', 'snivy': '495', 'servine': '496', 'serperior': '497',
                'tepig': '498', 'pignite': '499', 'emboar': '500', 'oshawott': '501', 'dewott': '502',
                'samurott': '503', 'patrat': '504', 'watchog': '505', 'lillipup': '506', 'herdier': '507',
                'stoutland': '508', 'purrloin': '509', 'liepard': '510', 'pansage': '511', 'simisage': '512',
                'pansear': '513', 'simisear': '514', 'panpour': '515', 'simipour': '516', 'munna': '517',
                'musharna': '518', 'pidove': '519', 'tranquill': '520', 'unfezant': '521', 'blitzle': '522',
                'zebstrika': '523', 'roggenrola': '524', 'boldore': '525', 'gigalith': '526', 'woobat': '527',
                'swoobat': '528', 'drilbur': '529', 'excadrill': '530', 'audino': '531', 'timburr': '532',
                'gurdurr': '533', 'conkeldurr': '534', 'tympole': '535', 'palpitoad': '536', 'seismitoad': '537',
                'throh': '538', 'sawk': '539', 'sewaddle': '540', 'swadloon': '541', 'leavanny': '542',
                'venipede': '543', 'whirlipede': '544', 'scolipede': '545', 'cottonee': '546', 'whimsicott': '547',
                'petilil': '548', 'lilligant': '549', 'basculin': '550', 'sandile': '551', 'krokorok': '552',
                'krookodile': '553', 'darumaka': '554', 'darmanitan': '555', 'maractus': '556', 'dwebble': '557',
                'crustle': '558', 'scraggy': '559', 'scrafty': '560', 'sigilyph': '561', 'yamask': '562',
                'cofagrigus': '563', 'tirtouga': '564', 'carracosta': '565', 'archen': '566', 'archeops': '567',
                'trubbish': '568', 'garbodor': '569', 'zorua': '570', 'zoroark': '571', 'minccino': '572',
                'cinccino': '573', 'gothita': '574', 'gothorita': '575', 'gothitelle': '576', 'solosis': '577',
                'duosion': '578', 'reuniclus': '579', 'ducklett': '580', 'swanna': '581', 'vanillite': '582',
                'vanillish': '583', 'vanilluxe': '584', 'deerling': '585', 'sawsbuck': '586', 'emolga': '587',
                'karrablast': '588', 'escavalier': '589', 'foongus': '590', 'amoonguss': '591', 'frillish': '592',
                'jellicent': '593', 'alomomola': '594', 'joltik': '595', 'galvantula': '596', 'ferroseed': '597',
                'ferrothorn': '598', 'klink': '599', 'klang': '600', 'klinklang': '601', 'tynamo': '602',
                'eelektrik': '603', 'eelektross': '604', 'elgyem': '605', 'beheeyem': '606', 'litwick': '607',
                'lampent': '608', 'chandelure': '609', 'axew': '610', 'fraxure': '611', 'haxorus': '612',
                'cubchoo': '613', 'beartic': '614', 'cryogonal': '615', 'shelmet': '616', 'accelgor': '617',
                'stunfisk': '618', 'mienfoo': '619', 'mienshao': '620', 'druddigon': '621', 'golett': '622',
                'golurk': '623', 'pawniard': '624', 'bisharp': '625', 'bouffalant': '626', 'rufflet': '627',
                'braviary': '628', 'vullaby': '629', 'mandibuzz': '630', 'heatmor': '631', 'durant': '632',
                'deino': '633', 'zweilous': '634', 'hydreigon': '635', 'larvesta': '636', 'volcarona': '637',
                'cobalion': '638', 'terrakion': '639', 'virizion': '640', 'tornadus': '641', 'thundurus': '642',
                'reshiram': '643', 'zekrom': '644', 'landorus': '645', 'kyurem': '646', 'keldeo': '647',
                'meloetta': '648', 'genesect': '649', 'chespin': '650', 'quilladin': '651', 'chesnaught': '652',
                'fennekin': '653', 'braixen': '654', 'delphox': '655', 'froakie': '656', 'frogadier': '657',
                'greninja': '658', 'bunnelby': '659', 'diggersby': '660', 'fletchling': '661', 'fletchinder': '662',
                'talonflame': '663', 'scatterbug': '664', 'spewpa': '665', 'vivillon': '666', 'litleo': '667',
                'pyroar': '668', 'flabebe': '669', 'floette': '670', 'florges': '671', 'skiddo': '672',
                'gogoat': '673', 'pancham': '674', 'pangoro': '675', 'furfrou': '676', 'espurr': '677',
                'meowstic': '678', 'honedge': '679', 'doublade': '680', 'aegislash': '681', 'spritzee': '682',
                'aromatisse': '683', 'swirlix': '684', 'slurpuff': '685', 'inkay': '686', 'malamar': '687',
                'binacle': '688', 'barbaracle': '689', 'skrelp': '690', 'dragalge': '691', 'clauncher': '692',
                'clawitzer': '693', 'helioptile': '694', 'heliolisk': '695', 'tyrunt': '696', 'tyrantrum': '697',
                'amaura': '698', 'aurorus': '699', 'sylveon': '700', 'hawlucha': '701', 'dedenne': '702',
                'carbink': '703', 'goomy': '704', 'sliggoo': '705', 'goodra': '706', 'klefki': '707',
                'phantump': '708', 'trevenant': '709', 'pumpkaboo': '710', 'gourgeist': '711', 'bergmite': '712',
                'avalugg': '713', 'noibat': '714', 'noivern': '715', 'xerneas': '716', 'yveltal': '717',
                'zygarde': '718', 'diancie': '719', 'hoopa': '720', 'volcanion': '721', 'rowlet': '722',
                'dartrix': '723', 'decidueye': '724', 'litten': '725', 'torracat': '726', 'incineroar': '727',
                'popplio': '728', 'brionne': '729', 'primarina': '730', 'pikipek': '731', 'trumbeak': '732',
                'toucannon': '733', 'yungoos': '734', 'gumshoos': '735', 'grubbin': '736', 'charjabug': '737',
                'vikavolt': '738', 'crabrawler': '739', 'crabominable': '740', 'oricorio': '741', 'cutiefly': '742',
                'ribombee': '743', 'rockruff': '744', 'lycanroc': '745', 'wishiwashi': '746', 'mareanie': '747',
                'toxapex': '748', 'mudbray': '749', 'mudsdale': '750', 'dewpider': '751', 'araquanid': '752',
                'fomantis': '753', 'lurantis': '754', 'morelull': '755', 'shiinotic': '756', 'salandit': '757',
                'salazzle': '758', 'stufful': '759', 'bewear': '760', 'bounsweet': '761', 'steenee': '762',
                'tsareena': '763', 'comfey': '764', 'oranguru': '765', 'passimian': '766', 'wimpod': '767',
                'golisopod': '768', 'sandygast': '769', 'palossand': '770', 'pyukumuku': '771', 'type-null': '772',
                'silvally': '773', 'minior': '774', 'komala': '775', 'turtonator': '776', 'togedemaru': '777',
                'mimikyu': '778', 'bruxish': '779', 'drampa': '780', 'dhelmise': '781', 'jangmo-o': '782',
                'hakamo-o': '783', 'kommo-o': '784', 'tapu-koko': '785', 'tapu-lele': '786', 'tapu-bulu': '787',
                'tapu-fini': '788', 'cosmog': '789', 'cosmoem': '790', 'solgaleo': '791', 'lunala': '792',
                'nihilego': '793', 'buzzwole': '794', 'pheromosa': '795', 'xurkitree': '796', 'celesteela': '797',
                'kartana': '798', 'guzzlord': '799', 'necrozma': '800', 'magearna': '801', 'marshadow': '802',
                'poipole': '803', 'naganadel': '804', 'stakataka': '805', 'blacephalon': '806', 'zeraora': '807',
                'meltan': '808', 'melmetal': '809', 'grookey': '810', 'thwackey': '811', 'rillaboom': '812',
                'scorbunny': '813', 'raboot': '814', 'cinderace': '815', 'sobble': '816', 'drizzile': '817',
                'inteleon': '818', 'skwovet': '819', 'greedent': '820', 'rookidee': '821', 'corvisquire': '822',
                'corviknight': '823', 'blipbug': '824', 'dottler': '825', 'orbeetle': '826', 'nickit': '827',
                'thievul': '828', 'gossifleur': '829', 'eldoss': '830', 'wooloo': '831', 'dubwool': '832',
                'chewtle': '833', 'drednaw': '834', 'yamper': '835', 'boltund': '836', 'rolycoly': '837',
                'carkol': '838', 'coalossal': '839', 'applin': '840', 'flapple': '841', 'appletun': '842',
                'silicobra': '843', 'sandaconda': '844', 'cramorant': '845', 'arrokuda': '846', 'barraskewda': '847',
                'toxel': '848', 'toxtricity': '849', 'sizzlipede': '850', 'centiskorch': '851', 'clobbopus': '852',
                'grapploct': '853', 'sinistea': '854', 'polteageist': '855', 'hatenna': '856', 'hattrem': '857',
                'hatterene': '858', 'impidimp': '859', 'morgrem': '860', 'grimmsnarl': '861', 'obstagoon': '862',
                'perrserker': '863', 'cursola': '864', 'sirfetchd': '865', 'mr-rime': '866', 'runerigus': '867',
                'milcery': '868', 'alcremie': '869', 'falinks': '870', 'pincurchin': '871', 'snom': '872',
                'frosmoth': '873', 'stonjourner': '874', 'eiscue': '875', 'indeedee': '876', 'morpeko': '877',
                'cufant': '878', 'copperajah': '879', 'dracozolt': '880', 'arctozolt': '881', 'dracovish': '882',
                'arctovish': '883', 'duraludon': '884', 'dreepy': '885', 'drakloak': '886', 'dragapult': '887',
                'zacian': '888', 'zamazenta': '889', 'eternatus': '890', 'kubfu': '891', 'urshifu': '892',
                'zarude': '893', 'regieleki': '894', 'regidrago': '895', 'glastrier': '896', 'spectrier': '897',
                'calyrex': '898','fuecoco':'909','kingambit':'983','tinkaton':'959','garganacl':'934','grafaiai':'945'
            };
            
            return pokedexNumbers[pokemonName.toLowerCase()] || '000';
        }




function getPokemonTypes(pokemonName){
    return pokemonTypes[pokemonName.toLowerCase()] || ["normal"]
}

function createTypeBadges(pokemonName){
    const types=getPokemonTypes(pokemonName)
    return types.map(type =>
         `<span class="pokemon-type type-${type}">${type}</span>`
    ).join("")
}

function showPokedex(){
    pokedexContainer.style.display="flex"
    renderPokedex()
}
function hidePokedex(){
    pokedexContainer.style.display="none"
}
function renderPokedex(){
    pokedexGrid.innerHTML=""
    const allPokemons=[]
    Object.values(cardTypes).forEach(pack => {
            pack.arts.forEach(pokemon => {
                if (!allPokemons.find(p => p.name === pokemon)) {
                    allPokemons.push({
                        name: pokemon,
                        rarity: pack.type,
                        class: pack.class
                    });
                }
        });
    });
    // allPokemons.sort()
    allPokemons.forEach(pokemon=>{
        console.log(pokemon)
        const isCollect=collectedPokemons[pokemon.name]
        const pokedexItem=document.createElement("div")
        pokedexItem.className=`pokedex-item ${isCollect ? '' : 'unseen'} ${pokemon.class}`
        const pokemonImage=document.createElement("img")
        pokemonImage.className='pokedex-image'
        pokemonImage.src=isCollect ? getPokemonImageUrl(pokemon.name):'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiMzMzMiLz48L3N2Zz4='
        pokemonImage.onerror=function(){
            this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiMzMzMiLz48L3N2Zz4=';
        }
        
        const pokemonName=document.createElement("div")
        pokemonName.className='pokedex-name'
        pokemonName.textContent= isCollect ? pokemon.name : "????"

        const pokemonType=document.createElement("div")
        pokemonType.className="card-types"
        if(isCollect){
            pokemonType.innerHTML=createTypeBadges(pokemon.name)

        }else{
            pokemonType.innerHTML="<span class='pokemon-type type-normal'>???</span>"
            }        
        // const rarityIndicator = document.createElement('div');
        // rarityIndicator.className = `rarity-indicator rarity-${pokemon.rarityName.replace(' ', '-')}`;
        // rarityIndicator.title = pokemon.rarityName;
        pokedexItem.appendChild(pokemonImage)
        pokedexItem.appendChild(pokemonName)
        pokedexItem.appendChild(pokemonType)
        // pokedexItem.appendChild(rarityIndicator)
        pokedexGrid.appendChild(pokedexItem)
    })
}
pokedexIcon.addEventListener("click",showPokedex)
closePokedex.addEventListener("click",hidePokedex)
function generatePack(){
    const pack=[]
    for(let i = 0 ; i < 7 ; i++){
        const random = Math.random();
        let cumulativeProbability = 0;
                
            for (const cardType of cardTypes) {
                cumulativeProbability += cardType.probability;
                if (random <= cumulativeProbability) {
                    const randomArt = cardType.arts[Math.floor(Math.random() * cardType.arts.length)];
                    pack.push({
                        ...cardType,
                        art: randomArt
                    });
                    break;
                }
            }
    }
    return pack
}
console.log(generatePack())
function createCardStack(pack){
    cardStack.innerHTML=""
    pack.forEach((card,index) => {
        const cardElement=document.createElement("div")
        cardElement.className=`stacked-card ${card.class}`
        cardElement.dataset.index=index
        cardElement.innerHTML=`
             <div class="card-art" style="background-image:url('${getPokemonImageUrl(card.art)}')"></div>
             <div class= "card-name" >${card.art.toUpperCase()}</div>
             <div class= "card-types">${createTypeBadges(card.art)}
             <div class="card-type">${card.type.toUpperCase()}</div>
             <div class="card-rarity">${card.type === "mythik" ? "★★★★★" : card.type === "legendary" ? "★★★★" : card.type === "epic" ? "★★★" : card.type === "uncommon" ? "★★" : card.type === "common" ? "★" : "★" }</div>

        `
        if(!collectedPokemons[card.art]){
            collectedPokemons[card.art]=true
            localStorage.setItem("myPokemons",JSON.stringify(collectedPokemons))
        }
    cardStack.appendChild(cardElement)
    cardElement.addEventListener("click",()=> flipCard(cardElement,card))
    });

}
function openPack(){
    console.log(1)
    openPackBtn.disabled=true
    openPackBtn.textContent="раналда"
    currentPack=generatePack()
    revealedCards=0
    setTimeout(() => {
        cardStack.style.display="block"
        createCardStack(currentPack)
    }, 500);
}
console.log(openPackBtn)
openPackBtn.addEventListener("click",openPack)
    
function flipCard(cardElement,cardInfo){
    if(cardElement.classList.contains("flipped")) return
    cardElement.classList.add("flipped")
    setTimeout(() => {
        cardElement.style.display="block"
    }, 1000);
    revealedCards++
    setTimeout(() => {
        const new_card=cardElement.cloneNode(true)
        new_card.className=`card ${cardInfo.class}`
        new_card.style.display="flex"
        new_card.style.transform="none"
        new_card.style.position="relative"
        new_card.style.margin="0"
        new_card.style.opacity="1"
        cardsContainer.appendChild(new_card)
        if(revealedCards===currentPack.length){
            resetBtn.style.display="block"
        }
    }, 1000);
}
function resetPack(){
    resetBtn.style.display="none"
    cardStack.style.display="none"
    setTimeout(() => {
        openPackBtn.disabled=false
        openPackBtn.textContent="again?"
    }, 1100);
}
resetBtn.addEventListener("click",resetPack)