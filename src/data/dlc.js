export const DLC_OBJS = [
  ["piranha_plant", "https://ssb.wiki.gallery/images/c/cf/PiranhaPlantHeadSSBUWebsite.png"],
  ["joker", "https://ssb.wiki.gallery/images/6/63/JokerHeadSSBUWebsite.png"],
  ["hero", "https://ssb.wiki.gallery/images/1/1e/HeroHeadSSBUWebsite.png"],
  ["banjo_and_kazooie", "https://ssb.wiki.gallery/images/1/12/Banjo%26KazooieHeadSSBUWebsite.png"],
  ["terry", "https://ssb.wiki.gallery/images/2/2e/TerryHeadSSBUWebsite.png"],
  ["byleth", "https://ssb.wiki.gallery/images/8/86/BylethHeadSSBUWebsite.png"],
  ["min_min", "https://ssb.wiki.gallery/images/f/fc/MinMinHeadSSBUWebsite.png"],
  ["steve", "https://ssb.wiki.gallery/images/4/4f/SteveHeadSSBUWebsite.png"],
  ["sephiroth", "https://ssb.wiki.gallery/images/6/64/SephirothHeadSSBUWebsite.png"],
  ["pyra_and_mythra", "https://ssb.wiki.gallery/images/7/7c/PyraHeadSSBUWebsite.png"],
  ["kazyua", "https://ssb.wiki.gallery/images/8/85/KazuyaHeadSSBUWebsite.png"]
]

export function getSelected() {
  return DLC_OBJS.map(obj => obj[0])
}