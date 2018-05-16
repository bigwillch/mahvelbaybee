export const characters = (data) =>  {

  const results =data.data.results.map(result => {

    return {
      'name': result.name,
      'img': result.thumbnail.path.includes('image_not_available') ? null : result.thumbnail.path + '.' + result.thumbnail.extension
    }
  });

  return {
    original: data,
    results
  }
}
