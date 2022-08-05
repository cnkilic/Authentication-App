import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>

      <h3>✔️ Even if you refreh the page you will stay signed-in</h3>
      <h3>
        ✔️ Your sign-in token saved in Local Storage of browser for 1 hour.
      </h3>
      <h3>
        ✔️ After that, it will be expired and you will be loged-out
        automatically.
      </h3>
      <h3>
        
      </h3>
    </section>
  );
};

export default StartingPageContent;
