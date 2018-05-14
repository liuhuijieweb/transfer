import shuttleBox from './shuttleBox'

const shuttle = {
    install (Vue ,options){
        Vue.component(shuttleBox.name ,shuttleBox);
    }
};
if(typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(shuttle);
}
export default shuttle;
