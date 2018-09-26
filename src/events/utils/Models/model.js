import * as tf from '@tensorflow/tfjs';

// Load the binding:
//require('../node_modules/@tensorflow/tfjs-node');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.

// Train a simple model:
function makeModel(inputDim){
const model = tf.sequential();
  model.add(tf.layers.batchNormalization({inputShape: inputDim}))
  model.add(tf.layers.dense({units: 200, activation: 'sigmoid'}));//1000 prms
  model.add(tf.layers.dropout({}));
  model.add(tf.layers.batchNormalization({center:true}))//1000+2000
  model.add(tf.layers.dense({units: 100, activation: 'relu'}));//3000+500
  model.add(tf.layers.dropout({}));
  model.add(tf.layers.batchNormalization({}))//3500+1000
  model.add(tf.layers.dense({units: 50, activation: 'relu'}));//4500+100
  model.add(tf.layers.dropout({}));
  model.add(tf.layers.batchNormalization({}))//4600+200
  model.add(tf.layers.dense({units: 20, activation: 'relu'}));//4800+20
  model.add(tf.layers.dropout({}));
  model.add(tf.layers.batchNormalization({}))//4820+40
  model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));
  model.compile({optimizer: 'adam', loss: 'binaryCrossentropy'});
  return model
}
export default makeModel