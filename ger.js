var esm = new g.MemESM()
var ger = new g.GER(esm);
ger.initialize_namespace('media')

insertFeedback(feedback: Record<string, any>) {
ger.events([{
  namespace: 'media',
  person: 'bob',
  action: 'likes',
  thing: 'xmen',
  expires_at: '2020-06-06'
}])
}

recommends(collName: string, item: string, actions: Record) {
ger.recommendations_for_thing(collName, 'xmen', {actions: actions})
}

recomm(collName: string, item: string, actions: Record) {
ger.recommendations_for_thing('movies', 'xmen', {actions: actions})
}
