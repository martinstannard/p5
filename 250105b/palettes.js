// Top 50 popular palettes from Coolors.com
const PALETTES = [
  ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'], // Default
  ['#22223B', '#4A4E69', '#9A8C98', '#C9ADA7', '#F2E9E4'], // Twilight
  ['#606C38', '#283618', '#FEFAE0', '#DDA15E', '#BC6C25'], // Earth Tones
  ['#355070', '#6D597A', '#B56576', '#E56B6F', '#EAAC8B'], // Sunset Fade
  ['#03045E', '#0077B6', '#00B4D8', '#90E0EF', '#CAF0F8'], // Ocean Blues
  ['#D4E09B', '#F6F4D2', '#CBDFBD', '#F19C79', '#A44A3F'], // Natural Harmony
  ['#FFB5A7', '#FCD5CE', '#F8EDEB', '#F9DCC4', '#FEC89A'], // Peach Tones
  ['#CCD5AE', '#E9EDC9', '#FEFAE0', '#FAEDCD', '#D4A373'], // Sage Garden
  ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'], // American Vintage
  ['#FF9F1C', '#FFBF69', '#FFFFFF', '#CBF3F0', '#2EC4B6'], // Fresh Mint
  ['#FFCDB2', '#FFB4A2', '#E5989B', '#B5838D', '#6D6875'], // Muted Rose
  ['#CB997E', '#DDBEA9', '#FFE8D6', '#B7B7A4', '#A5A58D'], // Desert Sand
  ['#001219', '#005F73', '#0A9396', '#94D2BD', '#E9D8A6'], // Coastal
  ['#9B5DE5', '#F15BB5', '#FEE440', '#00BBF9', '#00F5D4'], // Neon Pop
  ['#F72585', '#B5179E', '#7209B7', '#560BAD', '#480CA8'], // Vibrant Purple
  ['#3D405B', '#81B29A', '#F2CC8F', '#E07A5F', '#F4F1DE'], // Vintage Poster
  ['#EDC4B3', '#E6B8A2', '#DEAB90', '#D69F7E', '#CD9777'], // Skin Tones
  ['#F94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D'], // Warm Rainbow
  ['#FF0A54', '#FF477E', '#FF7096', '#FF85AB', '#FFA6C1'], // Pink Gradient
  ['#588157', '#3A5A40', '#344E41', '#DAD7CD', '#A3B18A'], // Forest
  ['#10002B', '#240046', '#3C096C', '#5A189A', '#7B2CBF'], // Deep Purple
  ['#FFE8D6', '#DDBEA9', '#CB997E', '#6B705C', '#A5A58D'], // Natural Brown
  ['#006D77', '#83C5BE', '#EDF6F9', '#FFDDD2', '#E29578'], // Coastal Breeze
  ['#FF99C8', '#FCF6BD', '#D0F4DE', '#A9DEF9', '#E4C1F9'], // Pastel Rainbow
  ['#FF595E', '#FF924C', '#FFD449', '#8AC926', '#1982C4'], // Primary Plus
  ['#FF0000', '#FF8700', '#FFE400', '#00FF00', '#0000FF'], // Pure Rainbow
  ['#2D00F7', '#6A00F4', '#8900F2', '#A100F2', '#B100E8'], // Electric Purple
  ['#FF7B00', '#FF8800', '#FF9500', '#FFA200', '#FFAA00'], // Orange Gradient
  ['#FF0A54', '#FF477E', '#FF7096', '#FF85AB', '#FFA6C1'], // Pink Love
  ['#00A6FB', '#0582CA', '#006494', '#003554', '#051923'], // Deep Ocean
  ['#F7B267', '#F79D65', '#F4845F', '#F27059', '#F25C54'], // Sunset Orange
  ['#70D6FF', '#FF70A6', '#FF9770', '#FFD670', '#E9FF70'], // Candy Pop
  ['#FADDE1', '#FFC4D6', '#FFA6C1', '#FF87AB', '#FF5D8F'], // Pink Paradise
  ['#D8F3DC', '#B7E4C7', '#95D5B2', '#74C69D', '#52B788'], // Green Growth
  ['#FF99C8', '#FF85AB', '#FF7096', '#FF477E', '#FF0A54'], // Pink Gradient 2
  ['#FF0000', '#FF4D00', '#FF9900', '#FFE500', '#CCFF00'], // Warm Spectrum
  ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00'], // RGB Plus
  ['#FF0000', '#FF8000', '#FFFF00', '#00FF00', '#0000FF'], // Classic Rainbow
  ['#FF0000', '#FF4000', '#FF8000', '#FFC000', '#FFFF00'], // Fire
  ['#00FF00', '#40FF00', '#80FF00', '#C0FF00', '#FFFF00'], // Lime to Yellow
  ['#0000FF', '#0040FF', '#0080FF', '#00C0FF', '#00FFFF'], // Ocean Depth
  ['#FF00FF', '#FF40FF', '#FF80FF', '#FFC0FF', '#FFFFFF'], // Magenta Fade
  ['#FF0000', '#FF2000', '#FF4000', '#FF6000', '#FF8000'], // Red Orange
  ['#00FFFF', '#00FFE0', '#00FFC0', '#00FFA0', '#00FF80'], // Cyan Mint
  ['#FF1B1C', '#FF4F69', '#FF8C89', '#FFBDBD', '#FFE9E9'], // Red Pink
  ['#4CC9F0', '#4895EF', '#4361EE', '#3F37C9', '#3A0CA3'], // Blue Gradient
  ['#F72585', '#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0'], // Retro Wave
  ['#FF0000', '#FF0066', '#FF00CC', '#FF00FF', '#CC00FF'], // Hot Pink Purple
  ['#FF0000', '#FF3333', '#FF6666', '#FF9999', '#FFCCCC'], // Red Tints
  ['#0000FF', '#3333FF', '#6666FF', '#9999FF', '#CCCCFF']  // Blue Tints
];
