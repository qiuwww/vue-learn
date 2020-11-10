import { Component, Vue } from 'vue-property-decorator';
@Component
class ProjectMixin extends Vue {
  public projName: string = 'My project';
  public setProjectName(newVal: string): void {
    this.projName = newVal;
  }
}
export default ProjectMixin;
