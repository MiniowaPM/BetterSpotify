from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Float, DateTime
import enum
from sqlalchemy.orm import relationship

from db import Base

class Genre(enum.Enum):
    Pop = 1
    Rock = 2
    Jazz = 3
    Classical = 4
    HipHop = 5
    RnB = 6
    Reggae = 7
    Country = 8
    Blues = 9
    Electronic = 10
    Folk = 11
    Metal = 12
    Soul = 13
    Funk = 14
    Punk = 15
    Disco = 16
    Gospel = 17
    House = 18
    Techno = 19
    Trance = 20
    Dubstep = 21
    Ambient = 22
    Indie = 23
    KPop = 24
    JPop = 25
    Latin = 26
    Salsa = 27
    Bachata = 28
    Reggaeton = 29
    Afrobeat = 30
    Ska = 31
    Grunge = 32
    Alternative = 33
    Emo = 34
    ProgressiveRock = 35
    SymphonicMetal = 36
    PostRock = 37
    Noise = 38
    Experimental = 39
    GarageRock = 40
    Hardcore = 41
    Industrial = 42
    NewWave = 43
    SynthPop = 44
    LoFi = 45
    TripHop = 46
    Chillwave = 47
    Vaporwave = 48
    Shoegaze = 49
    DreamPop = 50
    PsychedelicRock = 51
    Psytrance = 52
    Hardstyle = 53
    DrumAndBass = 54
    Breakbeat = 55
    Glitch = 56
    EDM = 57
    Dancehall = 58
    Trap = 59
    Grime = 60
    Drill = 61
    Dub = 62
    Moombahton = 63
    TropicalHouse = 64
    FutureBass = 65
    BigRoom = 66
    Electropop = 67
    Electroswing = 68
    Baroque = 69
    Opera = 70
    Choral = 71
    Minimalism = 72
    ContemporaryClassical = 73
    March = 74
    Soundtrack = 75
    MusicalTheatre = 76
    AvantGarde = 77
    SpokenWord = 78
    World = 79
    Celtic = 80
    Flamenco = 81
    MiddleEastern = 82
    Bollywood = 83
    Tango = 84
    BossaNova = 85
    Samba = 86
    Zydeco = 87
    Cajun = 88
    Bluegrass = 89
    Americana = 90
    Roots = 91
    Chillout = 92
    Meditation = 93
    Workout = 94
    Holiday = 95
    ChildrensMusic = 96
    Acapella = 97
    Mashup = 98
    Covers = 99
    Parody = 100

class Album(Base):
    __tablename__ = 'albums'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50), unique=True)
    description = Column(String(500), unique=False)
    artist = Column(String(50), unique=False)
    release_date = Column(DateTime)
    price = Column(Float, unique=False)
    genre = Column(Enum(Genre), nullable=False)