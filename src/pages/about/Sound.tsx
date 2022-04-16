import { useState, useCallback, useEffect } from "react";

const shortTone = `
<CsoundSynthesizer>
<CsOptions>
    -odac
</CsOptions>
<CsInstruments>
    chnset(1, "test1")
    chnset(2, "test2")
    instr 1
    out poscil(0dbfs/3, 440+rnd(440)) * linen:a(1, .01, p3, .01)
    endin
</CsInstruments>
<CsScore>
    i 1 0 2
</CsScore>
</CsoundSynthesizer>
`;

let Csound: any;
let csoundObj: any;
if (typeof window !== "undefined") {
  Csound = await Promise.resolve(import("@csound/browser"));
  csoundObj = await Csound?.Csound();
}

function App() {
  const [ready, setReady] = useState(false);

  const handleTestClick = useCallback(async () => {
    if (!ready) {
      setReady(true);
    }

    csoundObj.readScore("i 1 0 5");
  }, [csoundObj]);

  const init = useCallback(async () => {
    csoundObj = await Csound?.Csound();

    await csoundObj.start();
    await csoundObj.compileCsdText(shortTone);
  }, []);

  useEffect(() => {
    if (ready) init();
  }, [ready]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button onClick={handleTestClick}>Csound Test</button>
        </p>
      </header>
    </div>
  );
}

export default App;
