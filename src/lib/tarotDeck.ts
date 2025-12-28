// === DONNÉES DES 22 ARCANES MAJEURS ===
// Tarot avec focus sur les blocages inconscients et résonances personnelles

export interface TarotCard {
  id: number;
  name: string;
  type: "major";
  keywords: string;
  blocage: string;
  resonance: string;
  image: string;
}

export const tarotDeck: TarotCard[] = [
  {
    id: 0,
    name: "Le Fou",
    type: "major",
    keywords: "Liberté – Nouveaux commencements – Spontanéité",
    blocage: "Le Fou révèle un blocage inconscient lié à l'élan spontané empêché. Il s'enracine dans des expériences où ton mouvement naturel, ton enthousiasme ou ton envie d'explorer n'ont pas été sécurisés ou soutenus. Inconsciemment, tu as appris à freiner ton impulsion, à vérifier avant d'agir, comme si avancer sans garanties exposait à un danger. Ce blocage coupe l'élan à la racine et crée une méfiance intérieure face à l'inconnu.",
    resonance: "Dans ton histoire, à quel moment as-tu appris à arrêter ton élan avant même de te mettre en mouvement ?",
    image: "00-le-mat.png"
  },
  {
    id: 1,
    name: "Le Magicien",
    type: "major",
    keywords: "Création – Pouvoir intérieur – Action",
    blocage: "Le Magicien révèle un blocage inconscient lié à ta relation à ton pouvoir d'action. Il parle d'un moment où ton élan naturel d'initier et de dire « je peux » a été entravé. Ce blocage s'ancre souvent dans une expérience où ton expression personnelle a été minimisée, corrigée ou rendue silencieuse, créant une dissociation entre ce que tu veux et ce que tu fais.",
    resonance: "Dans ton histoire, à quel moment as-tu intégré l'idée que ton initiative à créer ou à être toi-même pouvait être inadaptée ?",
    image: "01-le-bateleur.png"
  },
  {
    id: 2,
    name: "La Grande-Prêtresse",
    type: "major",
    keywords: "Intuition – Sagesse – Réceptivité",
    blocage: "La Grande Prêtresse met en lumière un blocage inconscient lié à ta méfiance envers ton monde intérieur. Il s'agit d'une rupture avec ton intuition, souvent née dans un contexte où tes ressentis subtils n'ont pas été reconnus ou ont été disqualifiés. Ce blocage t'amène à chercher des repères extérieurs et à douter de ton savoir intérieur.",
    resonance: "Où, dans ton histoire, as-tu appris que ton ressenti profond n'était pas une source fiable de vérité ?",
    image: "02-la-papesse.png"
  },
  {
    id: 3,
    name: "L'Impératrice",
    type: "major",
    keywords: "Abondance – Créativité – Fertilité",
    blocage: "L'Impératrice révèle un blocage inconscient autour de ta sécurité affective et de ta capacité à recevoir. Ce blocage se forme lorsque ton environnement n'a pas offert un soutien stable, t'obligeant à développer une autonomie précoce. Il en résulte une difficulté à te sentir nourrie, soutenue et légitime dans l'abondance.",
    resonance: "Dans ton histoire, à quel moment as-tu compris que tu devais te débrouiller seule pour te sentir en sécurité ?",
    image: "03-l-imperatrice.png"
  },
  {
    id: 4,
    name: "L'Empereur",
    type: "major",
    keywords: "Stabilité – Ancrage – Autorité",
    blocage: "L'Empereur met en évidence un blocage inconscient lié à ta relation à la sécurité et au contrôle. Il s'ancre dans une peur profonde du chaos, souvent issue d'un cadre instable ou imprévisible. Le contrôle devient alors pour toi un mécanisme de survie afin de maintenir une sécurité intérieure.",
    resonance: "Dans ton histoire, où l'absence de sécurité t'a-t-elle obligée à te rigidifier intérieurement ?",
    image: "04-l-empereur.png"
  },
  {
    id: 5,
    name: "Le Hiérophante",
    type: "major",
    keywords: "Sagesse – Spiritualité – Transmission",
    blocage: "Le Hiérophante révèle un blocage inconscient fondé sur des croyances que tu as intégrées sans les questionner. Il naît lorsque l'amour, l'appartenance ou la reconnaissance ont été conditionnés au respect de règles extérieures, créant une dissociation entre ta vérité intérieure et la loyauté envers ton environnement.",
    resonance: "Dans ton histoire, quelles croyances continues-tu de porter par loyauté plutôt que par vérité ?",
    image: "05-le-pape.png"
  },
  {
    id: 6,
    name: "Les Amoureux",
    type: "major",
    keywords: "Décision – Amour pour soi – Alignement",
    blocage: "Les Amoureux révèlent un blocage inconscient lié à la peur de choisir pour toi. Il se construit lorsque tu as appris que faire un choix personnel pouvait provoquer un conflit, une déception ou une rupture du lien. Inconsciemment, tu as intégré qu'il valait mieux hésiter, composer ou rester dans l'entre-deux plutôt que d'affirmer clairement ce que tu veux. Ce blocage crée une division intérieure, t'empêchant de t'engager pleinement dans une direction et de te sentir alignée avec tes décisions.",
    resonance: "Dans ton histoire, à quel moment as-tu appris que choisir pour toi pouvait mettre en danger le lien avec l'autre ?",
    image: "06-l-amoureux.png"
  },
  {
    id: 7,
    name: "Le Chariot",
    type: "major",
    keywords: "Détermination – Maîtrise de soi – Volonté",
    blocage: "Le Chariot révèle un blocage inconscient lié à un élan freiné. Il se construit à un moment où tu as ressenti l'envie claire de prendre une nouvelle direction, d'avancer ou de changer de cap, mais où quelque chose t'en a empêchée. Qu'il s'agisse d'un contexte contraignant, d'un manque de soutien ou d'une peur intériorisée, ton mouvement a été stoppé. Inconsciemment, cela a installé une frustration profonde et un sentiment d'impuissance, comme si avancer demandait toujours plus d'efforts sans jamais aboutir.",
    resonance: "Dans ton histoire, à quel moment ton envie d'avancer a-t-elle été freinée ou empêchée ?",
    image: "07-le-chariot.png"
  },
  {
    id: 8,
    name: "La Force",
    type: "major",
    keywords: "Courage – Maîtrise de soi – Patience",
    blocage: "La Force révèle un blocage inconscient autour de la régulation de tes émotions instinctives. Il se forme lorsque certaines expressions émotionnelles comme la colère, la tristesse ont été perçues comme excessives. Tu as alors appris à te contenir, à te maîtriser intérieurement, parfois au prix d'une coupure avec ton énergie vitale et ton authenticité émotionnelle.",
    resonance: "Dans ton histoire, quelles émotions as-tu dû dompter pour rester aimable ou acceptable ?",
    image: "08-la-force.png"
  },
  {
    id: 9,
    name: "L'Hermite",
    type: "major",
    keywords: "Introspection – Sagesse – Voyage intérieur",
    blocage: "L'Hermite révèle un blocage inconscient lié à un besoin profond de retrait intérieur pour éviter d'être confronté à la réalité. Il se construit lorsque l'environnement a été vécu comme trop envahissant, trop exigeant ou émotionnellement confus. Ce blocage se manifeste aujourd'hui par une difficulté à rester engagée dans la réalité et l'envie de fuir dans ta grotte dès que la vie devient trop intense.",
    resonance: "Dans ton histoire, à quel moment as-tu appris que te retirer était une façon de fuir ta réalité intérieure ?",
    image: "09-l-hermite.png"
  },
  {
    id: 10,
    name: "La Roue de la Fortune",
    type: "major",
    keywords: "Cycles – Chance – Destin",
    blocage: "La Roue de Fortune révèle un blocage inconscient lié à ton rapport au mouvement et à l'imprévisibilité. Ce blocage s'enracine dans des expériences où les changements se sont imposés sans préparation ni soutien, créant une insécurité profonde face à ce qui échappe à ton contrôle. Inconsciemment, tu peux tenter de figer les situations ou d'anticiper excessivement pour éviter de revivre cette perte de repères.",
    resonance: "Dans ton histoire, quels changements subis ont installé une méfiance envers le cours de la vie ?",
    image: "10-la-roue-de-fortune.png"
  },
  {
    id: 11,
    name: "La Justice",
    type: "major",
    keywords: "Équilibre – Vérité – Responsabilité",
    blocage: "La Justice met en évidence un blocage inconscient lié à l'auto-analyse. Il prend racine dans un environnement où l'erreur était associée à une perte de valeur, t'amenant à développer une surveillance intérieure, à de grandes exigences constantes et une difficulté à te permettre l'imperfection.",
    resonance: "Dans ton histoire, pourquoi as-tu commencé à te juger plus sévèrement que les autres ?",
    image: "11-la-justice.png"
  },
  {
    id: 12,
    name: "Le Pendu",
    type: "major",
    keywords: "Lâcher-prise – Réflexion – Changement de perspective",
    blocage: "Le Pendu révèle un blocage inconscient lié au fait de te mettre de côté. Il se construit lorsque tu as appris que pour éviter le conflit, garder la paix ou être aimée, il fallait attendre, supporter ou renoncer à tes propres besoins. Inconsciemment, tu as intégré que ton mouvement, tes envies ou tes décisions pouvaient déranger. Ce blocage t'amène à rester immobile, à repousser tes élans et à accepter des situations inconfortables plutôt que de risquer de perdre le lien.",
    resonance: "Dans ton histoire, à quel moment as-tu appris à te mettre en pause pour que le lien tienne ?",
    image: "12-le-pendu.png"
  },
  {
    id: 13,
    name: "La Mort",
    type: "major",
    keywords: "Transformation – Fin – Renouveau",
    blocage: "La Mort révèle un blocage inconscient lié à l'incapacité de laisser partir ce qui est terminé. Il se forme lorsque une rupture, une perte ou un changement important a été trop brutal, trop douloureux ou mal accompagné. Inconsciemment, tu as appris qu'il valait mieux t'accrocher, prolonger ou maintenir une situation connue plutôt que de traverser une fin. Ce blocage t'amène à rester liée à des personnes, des rôles ou des schémas qui ne te correspondent plus, par peur de revivre la douleur de la séparation.",
    resonance: "Dans ton histoire, qu'est-ce que tu n'as pas pu laisser partir et que tu continues à porter malgré toi ?",
    image: "13-l-arcane-sans-nom.png"
  },
  {
    id: 14,
    name: "La Tempérance",
    type: "major",
    keywords: "Équilibre – Harmonie – Modération",
    blocage: "La Tempérance révèle un blocage inconscient lié au fait de trop t'adapter. Il se construit lorsque tu as appris que pour préserver l'équilibre, éviter les tensions ou maintenir la paix, il fallait ajuster ton rythme, tes émotions ou tes besoins à ceux des autres. Inconsciemment, tu as pris l'habitude de lisser ce que tu ressens, de modérer tes réactions et de te contenir, jusqu'à ne plus savoir clairement ce qui est juste pour toi. Ce blocage crée une harmonie apparente à l'extérieur, mais une perte d'alignement à l'intérieur.",
    resonance: "Dans ton histoire, à quel moment t'es-tu habituée à t'adapter aux autres plutôt qu'à écouter ton propre rythme ?",
    image: "14-temperance.png"
  },
  {
    id: 15,
    name: "Le Diable",
    type: "major",
    keywords: "Illusion – Attachement – L'ego",
    blocage: "Le Diable révèle un blocage inconscient lié à des dépendances affectives, émotionnelles ou comportementales profondément ancrées. Il prend racine dans des expériences où la sécurité, l'amour ou la reconnaissance étaient conditionnés, créant une confusion entre attachement et survie. Inconsciemment, tu as appris que rester liée, même à ce qui enferme, contrôle ou fait souffrir, était plus sûr que risquer la perte ou le vide.",
    resonance: "Dans ton histoire, quelle dépendance s'est installée comme une nécessité de survie plutôt que comme un choix libre ?",
    image: "15-le-diable.png"
  },
  {
    id: 16,
    name: "La Tour",
    type: "major",
    keywords: "Effondrement – Reconstruction – Révélation",
    blocage: "La Tour met en évidence un blocage inconscient lié à la peur de l'effondrement intérieur. Il se forme après des ruptures brutales, des chocs émotionnels ou des vérités révélées sans accompagnement. Inconsciemment, tu peux développer une hypervigilance permanente pour éviter toute remise en question profonde.",
    resonance: "Dans ton histoire, quels effondrements ont laissé la sensation que tout pouvait s'écrouler à tout moment ?",
    image: "16-la-maison-dieu.png"
  },
  {
    id: 17,
    name: "L'Étoile",
    type: "major",
    keywords: "Espoir – Guérison – Inspiration",
    blocage: "L'Étoile révèle un blocage inconscient lié à la coupure progressive de l'espoir comme mécanisme de protection. Il se met en place lorsque, à un moment clé, ta vulnérabilité ou ton besoin de réparation n'ont pas été accueillis. Inconsciemment, tu as appris que croire, attendre ou t'ouvrir à la possibilité d'un mieux exposait à une blessure supplémentaire. Ce blocage te pousse alors à limiter tes attentes, à contenir ton élan intérieur et à ne t'autoriser qu'un espoir mesuré, contrôlé, pour éviter toute nouvelle désillusion.",
    resonance: "Dans ton histoire, à quel moment as-tu appris à réduire tes attentes pour te protéger émotionnellement ?",
    image: "17-l-etoile.png"
  },
  {
    id: 18,
    name: "La Lune",
    type: "major",
    keywords: "Intuition – Mystères – Éveil",
    blocage: "La Lune révèle un blocage inconscient lié à ce qui n'a jamais pu être dit. Il se forme lorsque tes émotions, tes peurs ou ton vécu n'ont pas trouvé d'espace pour être exprimés ou entendus. Inconsciemment, tu as appris à taire ce qui te traversait, à contenir plutôt qu'à verbaliser. Ce blocage crée une accumulation émotionnelle interne, comme un trop-plein silencieux, générant une tension intérieure et un besoin profond de crier, sans savoir à qui ni comment t'adresser.",
    resonance: "Dans ton histoire, à quel moment as-tu appris à tout garder à l'intérieur alors que quelque chose en toi avait besoin de crier ?",
    image: "18-la-lune.png"
  },
  {
    id: 19,
    name: "Le Soleil",
    type: "major",
    keywords: "Joie – Succès – Clarté",
    blocage: "Le Soleil révèle un blocage inconscient lié à la répression de ton expression spontanée. Il se forme lorsque ta joie, ton enthousiasme ou ton besoin de reconnaissance ont été minimisés, critiqués ou vécus comme excessifs par ton entourage. Inconsciemment, tu as appris à te faire plus petite, à contenir ton rayonnement pour ne pas déranger, ne pas susciter de jalousie ou ne pas risquer la rupture du lien. Ce blocage t'amène à limiter ta joie et à t'empêcher d'occuper pleinement ta place.",
    resonance: "Dans ton histoire, à quel moment as-tu appris qu'exprimer ta joie ou ta lumière pouvait déranger ou coûter le lien ?",
    image: "19-le-soleil.png"
  },
  {
    id: 20,
    name: "Le Jugement",
    type: "major",
    keywords: "Renouveau – Pardon – Éveil",
    blocage: "Le Jugement révèle un blocage inconscient lié au poids du jugement et à la difficulté du pardon. Il se construit lorsque tu as grandi ou évolué dans un cadre où l'erreur, la faute ou l'imperfection étaient jugées, condamnées ou sanctionnées. Inconsciemment, tu as intégré une voix intérieure sévère, te maintenant dans la culpabilité ou l'auto-accusation. Ce blocage t'empêche de te libérer du passé, de te pardonner ou de pardonner à l'autre, comme si lâcher le jugement revenait à perdre le contrôle ou à nier ce qui a été vécu.",
    resonance: "Dans ton histoire, à quel moment le jugement — envers toi ou envers l'autre — est-il devenu plus fort que le pardon et la libération ?",
    image: "20-le-jugement.png"
  },
  {
    id: 21,
    name: "Le Monde",
    type: "major",
    keywords: "Accomplissement – Épanouissement – Intégration",
    blocage: "Le Monde révèle un blocage inconscient lié à la difficulté de t'autoriser à être pleinement toi-même. Il se construit lorsque tu as appris qu'il fallait te fragmenter, t'adapter ou te retenir pour être acceptée. Inconsciemment, être entière, visible et alignée peut être vécu comme risqué, comme si montrer qui tu es vraiment pouvait provoquer un rejet, une rupture ou une perte de lien. Ce blocage t'empêche d'habiter totalement ton identité et de te reconnaître dans ta complétude.",
    resonance: "Dans ton histoire, à quel moment as-tu appris que te montrer pleinement telle que tu es n'était pas possible ou pas sécurisant ?",
    image: "21-le-monde.png"
  }
];

// Fonction utilitaire pour obtenir l'URL de l'image
export function getImageUrl(card: TarotCard, size: '300w' | '150w' = '300w'): { webp: string; fallback: string } {
  const baseName = card.image.replace('.png', '');
  return {
    webp: `/images/major/${baseName}-${size}.webp`,
    fallback: `/images/major/${card.image}`
  };
}

// Fonction pour obtenir une carte par son ID
export function getCardById(id: number): TarotCard | undefined {
  return tarotDeck.find(card => card.id === id);
}
