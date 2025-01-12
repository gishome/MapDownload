// 地图
import TileTMS from './tile-tms';
import TileBaidu from './tile-baidu';
import { getState } from './progress';
class FileSave{
  constructor(data) {
    const projection = data.mapConfig.projection.code; // BAIDU,EPSG:4326,EPSG:3857
    if (getState()) {
      return alert('下载任务执行中，请稍后..');
    }
    if (projection === 'BAIDU') {
      this.downloadBaidu(data);
    } else {
      this.downloadTms(data);
    }
  }
  saveImage(param) {
    // const param = {
    //   url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/9/207/421',
    //   savePath: '',
    // };
    // param.savePath = this.rootPath + '\\421.png';
    window.electron.ipcRenderer.send('save-image', param);

  }
  ensureDirSync(path) {
    window.electron.ipcRenderer.send('ensure-dir', path);
  }
  downloadTms(data) {
    new TileTMS(data, this.saveImage, this.ensureDirSync);
  }
  downloadBaidu(data) {
    new TileBaidu(data, this.saveImage, this.ensureDirSync);
  }
}

export default FileSave;
