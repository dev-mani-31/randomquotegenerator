function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState([]);
  const [colors, setColors] = React.useState("#000000");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();

      setQuotes(data);
      const randomNumber = Math.floor(Math.random() * data.length);
      setRandomQuote(data[randomNumber]);
    }
    fetchData();
  }, []);

  function getNewQuote() {
    const colors = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
    ];
    const randomNumber = Math.floor(Math.random() * quotes.length);
    const randomColor = Math.floor(Math.random() * colors.length);
    setRandomQuote(quotes[randomNumber]);
    setColors(colors[randomColor]);
  }

  return (
    <div style={{ backgroundColor: colors, minHeight: "100vh" }}>
      <div className="container pt-5">
        <div className="jumbotron">
          <div className="card">
            <div className="card-header" style={{ color: colors }}>
              Inspirational Quotes
            </div>
            <div className="card-body">
              {randomQuote ? (
                <>
                  <h5 className="card-title" style={{ color: colors }}>
                    {randomQuote.text}
                  </h5>
                  <p className="card-text" style={{ color: colors }}>
                    {randomQuote.author}
                  </p>
                </>
              ) : (
                <h2>Loading</h2>
              )}
              <div className="row">
                <button className="btn btn-primary ml-3" onClick={getNewQuote}>
                  New Quote
                </button>
                <a
                  href={
                    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                    encodeURIComponent(
                      '"' + randomQuote.text + '" ' + randomQuote.author
                    )
                  }
                  target="_blank"
                  className="btn btn-warning"
                >
                  Twitter
                </a>
                <a
                  href={
                    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                    encodeURIComponent(randomQuote.author) +
                    "&content=" +
                    encodeURIComponent(randomQuote.text) +
                    "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                  }
                  target="_blank"
                  className="btn btn-danger"
                >
                  Tumblr
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
