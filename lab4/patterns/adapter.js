"use strict";
class OldSystem {
    oldRequest() {
        return "Old system response";
    }
}
class Adapter {
    constructor(oldSystem) {
        this.oldSystem = oldSystem;
    }
    request() {
        return this.oldSystem.oldRequest();
    }
}
const oldSystem = new OldSystem();
const adapter = new Adapter(oldSystem);
console.log(adapter.request());
