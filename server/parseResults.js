export const characterResults = (data) =>  {

  const results =data.data.results.map(result => {
    return {
      'name': result.name,
      'thumbnail': result.thumbnail
    }
  });

  return {
    original: data,
    results
  }
}
