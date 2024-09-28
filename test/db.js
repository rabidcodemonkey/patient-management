module.exports = {
  users: [
    { id: 123, name: 'John Doe' },
    { id: 456, name: 'Jane Doe' },
  ],
  forms: [
    {
      id: 1,
      name: 'Form 1',
      published: false,
      description: 'Form 1 description',
      shareUrl: 'abcd-1234',
      content: '[]',
    },
    {
      id: '2',
      name: 'Form 2',
      published: false,
      description: 'Form 2 description',
      shareUrl: 'abcd-1234-2',
      content:
        '[{"id":"9ZeiN54-87V2me95ipoI0","type":"TextField","properties":{"label":"Text Field","helperText":"Helper Text","required":false,"placeHolderText":"Placeholder Text"}},{"id":"Dz5BfDd3an2214VGpWPZ5","type":"TextField","properties":{"label":"Text Field","helperText":"Helper Text","required":false,"placeHolderText":"Placeholder Text"}}]',
    },
  ],
  formSubmissions: [
    {
      id: 1,
      form_id: 1,
      content: '[]',
    },
  ],
}
