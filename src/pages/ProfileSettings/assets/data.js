export const data = [
  {
    title: 'Measurement Preference',
    text: '',
    options: [{id: '1', name: "preference", value: "Metric"}, {id: '2', name: "preference", value: "Imperial"}],
    type: 'radio'
  },
  {
    title: 'Primary Diet',
    text: 'Controls which version of the recipe you see by default. All recipe diet can be switch on the recipe page.',
    options: [{id: '3', name: "Primary", value: "Omnivore"}, {
      id: '4',
      name: "Primary",
      value: "Vegetarian"
    }, {id: '5', name: "Primary", value: "Vegan"}],
    type: 'radio'
  },
  {
    title: 'Secondary Diet',
    text: 'For dairy free and vegetarian recipes, select vegan as your primary diet',
    options: [{id: '1', name: "Dairy Free", value: "Dairy Free"}, {id: '2', name: "Gluten Free", value: "Gluten Free"}],
    type: 'switch'
  }
]