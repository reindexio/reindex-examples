import { last } from 'lodash';
import React, {
  Component,
  View,
} from 'react-native';
import Relay from 'react-relay';

import { COLOR, Icon } from 'react-native-material-design';
import Spinner from 'react-native-spinkit';
import { FileUpload } from 'NativeModules';

import Config from '../config';
import { PICTURE_ROUTE } from '../Routes';
import UploadPictureMutation from '../mutations/UploadPictureMutation';
import Camera from './Camera';
import PicturePreview from './PicturePreview';

class AddPicture extends Component {
  constructor(props) {
    super();
    this.state = {
      state: 'camera',
      image: null,
    };
  }

  handleTakenPicture = async (filePath) => {
    this.setState({
      state: 'loading',
    });
    FileUpload.upload({
      uploadUrl: 'https://upload.uploadcare.com/base/',
      methods: 'POST',
      headers: {
        Accept: 'application/json',
      },
      fields: {
        UPLOADCARE_PUB_KEY: Config.UPLOADCARE_PUB_KEY,
        UPLOADCARE_STORE: '1',
      },
      files: [
        {
          filename: last(filePath.split('/')),
          filepath: filePath.split('file:')[1],
        },
      ],
    }, (err, result) => {
      if (err) {
        console.log(err);
        this.setState({
          state: 'photo',
        });
      } else {
        this.setState({
          state: 'preview',
          image: JSON.parse(result.data).image,
        });
      }
    });
  }

  handleConfirmPicture = () => {
    Relay.Store.commitUpdate(new UploadPictureMutation({
      uploadCareId: this.state.image,
      viewer: this.props.viewer,
    }), {
      onFailure: () => {
        console.error('error');
      },
      onSuccess: (response) => {
        this.props.navigator.replace({
          ...PICTURE_ROUTE,
          index: this.props.route.index,
          id: response.createPicture.changedPictureEdge.node.id,
        });
      },
    });
  };

  handleCancelPicture = () => {
    this.setState({
      state: 'camera',
      image: null,
    });
  };

  render() {
    if (this.state.state === 'camera') {
      return (
        <Camera onTakenPicture={this.handleTakenPicture} />
      );
    } else if (this.state.state === 'loading') {
      return (
        <Spinner
          type="ThreeBounce"
          color={COLOR.paperGrey200.color}
          size={64} />
      );
    } else {
      return (
        <PicturePreview
          image={this.state.image}
          onCancel={this.handleCancelPicture}
          onConfirm={this.handleConfirmPicture} />
      );
    }
  }
}

export default Relay.createContainer(AddPicture, {
  fragments: {
    // We request first picture here so that we always have a client-side
    // connection cache to add uploaded picture to
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        ${UploadPictureMutation.getFragment('viewer')}
        user {
          pictures(first: 1) {
            edges {
              node {
                id
                uploadCareId
              }
            }
          }
        }
        allPictures(orderBy: CREATED_AT_DESC, first: 1) {
          edges {
            node {
              id
              uploadCareId
            }
          }
        }
      }
    `,
  },
});
