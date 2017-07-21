import chai, { expect } from 'chai';
import { spy, mock } from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { setActivePeer, resetActivePeer, requestToActivePeer } from './peers';
import store from '../../store';

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Utils: Peers', () => {
  describe('requestToActivePeer', () => {
    let activePeerMock;
    const path = '/test/';
    const urlParams = {};
    const activePeer = {
      sendRequest: () => { },
    };

    beforeEach(() => {
      activePeerMock = mock(activePeer);
    });

    afterEach(() => {
      activePeerMock.verify();
      activePeerMock.restore();
    });

    it('should return a promise that is resolved when activePeer.sendRequest() calls its callback with data.success == true', () => {
      const response = {
        success: true,
        data: [],
      };
      activePeerMock.expects('sendRequest').withArgs(path, urlParams).callsArgWith(2, response);
      const requestPromise = requestToActivePeer(activePeer, path, urlParams);
      expect(requestPromise).to.eventually.deep.equal(response);
    });

    it('should return a promise that is resolved when activePeer.sendRequest() calls its callback with data.success == true', () => {
      const response = {
        success: false,
        message: 'some error message',
      };
      activePeerMock.expects('sendRequest').withArgs(path, urlParams).callsArgWith(2, response);
      const requestPromise = requestToActivePeer(activePeer, path, urlParams);
      expect(requestPromise).to.be.rejectedWith(response);
    });
  });

  describe('setActivePeer', () => {
    afterEach(() => {
      resetActivePeer(store);
    });
    it('dispatches activePeerSet action', () => {
      const network = {
        address: 'http://localhost:4000',
        testnet: true,
        nethash: '198f2b61a8eb95fbeed58b8216780b68f697f26b849acf00c8c93bb9b24f783d',
      };
      const actionSpy = spy(store, 'dispatch');
      setActivePeer(network);
      expect(actionSpy).to.have.been.calledWith();
      store.dispatch.restore();
    });

    it('dispatches activePeerSet action also when address http missing', () => {
      const network = {
        address: 'localhost:8000',
      };
      const actionSpy = spy(store, 'dispatch');
      setActivePeer(network);
      expect(actionSpy).to.have.been.calledWith();
      store.dispatch.restore();
    });

    it('dispatches activePeerSet action even if network is undefined', () => {
      const actionSpy = spy(store, 'dispatch');
      setActivePeer();
      expect(actionSpy).to.have.been.calledWith();
      store.dispatch.restore();
    });

    it('dispatches activePeerSet action even if network.address is undefined', () => {
      const network = {};
      const actionSpy = spy(store, 'dispatch');
      setActivePeer(network);
      expect(actionSpy).to.have.been.calledWith();
      store.dispatch.restore();
    });

    it('should set to testnet if not defined in config but port is 7000', () => {
      const network7000 = {
        address: 'http://127.0.0.1:7000',
        nethash: '198f2b61a8eb95fbeed58b8216780b68f697f26b849acf00c8c93bb9b24f783d',
      };
      const network4000 = {
        address: 'http://127.0.0.1:4000',
        nethash: '198f2b61a8eb95fbeed58b8216780b68f697f26b849acf00c8c93bb9b24f783d',
      };
      let activePeer = setActivePeer(network7000);
      expect(activePeer.data.testnet).to.be.equal(true);
      activePeer = setActivePeer(network4000);
      expect(activePeer.data.testnet).to.be.equal(false);
    });
  });

  describe('resetActivePeer', () => {
    it('dispatches activePeerReset action', () => {
      const actionSpy = spy(store, 'dispatch');

      resetActivePeer(store);
      expect(actionSpy).to.have.been.calledWith();
      store.dispatch.restore();
    });
  });
});
