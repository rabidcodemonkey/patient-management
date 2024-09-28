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
  ],
  formSubmissions: [
    {
      id: 1,
      form_id: 1,
      content: '[]',
    },
  ],
};
