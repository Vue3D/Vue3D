import {inject} from "vue";
import {GridHelper} from 'three'

export default {
    grid(options) {
        const opts = Object.assign({size: 100, divisions: 100}, options);
        const parent = inject('parent')
        const helper = new GridHelper(opts.size, opts.divisions)
        parent.add(helper)
    }
}
