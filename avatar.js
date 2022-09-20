textSearch(collName: string, field: string, query: string) {
	name
const { data, error } = await supabase
.from(collName)
.select()
.textSearch(field, `${query}`)
return { data, error }
}

//SQL
alter table 
  avatars 
add column 
  fts tsvector generated always as (to_tsvector('english', name || ' ')) stored;
  
create index authors_fts on authors using gin (fts); -- generate the index

select id, fts 
from authors;

getThumbnail(name: string) {
let data = this.textSearch()
return data.thumbnail
}
