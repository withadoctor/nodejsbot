
  message.channel.fetchMessages({limit: 100})
  .then((res) => {
    res.array().forEach(x => {
      console.log(x.author.username, x.content);
    });
  })
