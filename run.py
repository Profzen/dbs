# run.py pour le virtuel

from app import app

if __name__ == '__main__':
    print("Starting Flask app...")  # Cette ligne est pour vérifier que run.py est bien exécuté
    app.run(debug=True, host='127.0.0.1', port=5000)


# run.py
#from app import app

#if __name__ == '__main__':
    # Pour le développement, utilisez app.run()
    #app.run(debug=True)
