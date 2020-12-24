DOCGEN=../../node_modules/react-docgen/bin/react-docgen.js
rm -rf features components
mkdir features
mkdir components
cd features
$DOCGEN ../../src/features | node ../buildDocs.sh
cd ../components
$DOCGEN ../../src/components | node ../buildDocs.sh

