import Reindex from 'reindex-js';
import Config from './config';

const reindex = new Reindex(Config.REINDEX_URL);

export default reindex;
