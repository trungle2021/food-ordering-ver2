const mongoose = require('mongoose');
require('dotenv').config();

async function fixPhoneIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const User = mongoose.model('User');
    
    // Drop the problematic index
    await User.collection.dropIndex('phone_1');
    console.log('Dropped existing phone index');

    // Update existing documents to remove null phones
    await User.updateMany(
      { phone: null },
      { $unset: { phone: "" } }
    );
    console.log('Removed null phone fields');

    // Create new sparse index
    await User.collection.createIndex(
      { phone: 1 }, 
      { 
        unique: true, 
        sparse: true,
        background: true
      }
    );
    console.log('Created new sparse index');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

fixPhoneIndex(); 