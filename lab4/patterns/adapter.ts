interface NewSystem {
    request(): string;
  }
  
  class OldSystem {
    oldRequest(): string {
      return "Old system response";
    }
  }
  
  class Adapter implements NewSystem {
    private oldSystem: OldSystem;
  
    constructor(oldSystem: OldSystem) {
      this.oldSystem = oldSystem;
    }
  
    request(): string {
      return this.oldSystem.oldRequest();
    }
  }
  
  const oldSystem = new OldSystem();
  const adapter = new Adapter(oldSystem);
  console.log(adapter.request());